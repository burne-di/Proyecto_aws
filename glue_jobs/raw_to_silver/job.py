"""
AWS Glue Job: RAW to SILVER Layer Transformation
Cleans, validates, and standardizes data from RAW layer
"""

import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job
from pyspark.sql.functions import *
from pyspark.sql.types import *
import logging

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Get job parameters
args = getResolvedOptions(sys.argv, [
    'JOB_NAME',
    'source_database',
    'source_table',
    'target_s3_path',
    'target_database',
    'target_table'
])

# Initialize Glue context
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

logger.info(f"Starting RAW to SILVER transformation for {args['source_table']}")

try:
    # Read from RAW layer (Data Catalog)
    logger.info(f"Reading from source: {args['source_database']}.{args['source_table']}")
    raw_dyf = glueContext.create_dynamic_frame.from_catalog(
        database=args['source_database'],
        table_name=args['source_table'],
        transformation_ctx="raw_dyf"
    )

    # Convert to Spark DataFrame for complex transformations
    raw_df = raw_dyf.toDF()

    logger.info(f"Raw records count: {raw_df.count()}")

    # Data Quality Checks
    logger.info("Performing data quality checks...")

    # Remove duplicates
    silver_df = raw_df.dropDuplicates()

    # Remove nulls from key columns
    if 'order_id' in raw_df.columns:
        silver_df = silver_df.filter(col('order_id').isNotNull())
    if 'customer_id' in raw_df.columns:
        silver_df = silver_df.filter(col('customer_id').isNotNull())

    # Data Type Casting and Standardization
    logger.info("Applying data type casting and standardization...")

    if 'order_date' in silver_df.columns:
        silver_df = silver_df.withColumn('order_date', to_timestamp(col('order_date')))

    if 'amount' in silver_df.columns:
        silver_df = silver_df.withColumn('amount', col('amount').cast(DecimalType(10, 2)))
        # Remove negative amounts (business rule)
        silver_df = silver_df.filter(col('amount') >= 0)

    if 'status' in silver_df.columns:
        silver_df = silver_df.withColumn('status', lower(trim(col('status'))))

    if 'email' in silver_df.columns:
        silver_df = silver_df.withColumn('email', lower(trim(col('email'))))

    # Add metadata columns
    logger.info("Adding metadata columns...")
    silver_df = silver_df.withColumn('processed_timestamp', current_timestamp())
    silver_df = silver_df.withColumn('source_file', input_file_name())
    silver_df = silver_df.withColumn('processing_date', current_date())

    # Partition by date for efficient querying
    if 'order_date' in silver_df.columns:
        silver_df = silver_df.withColumn('partition_year', year(col('order_date')))
        silver_df = silver_df.withColumn('partition_month', month(col('order_date')))
        silver_df = silver_df.withColumn('partition_day', dayofmonth(col('order_date')))

    logger.info(f"Clean records count: {silver_df.count()}")

    # Convert back to DynamicFrame
    silver_dyf = DynamicFrame.fromDF(silver_df, glueContext, "silver_dyf")

    # Write to SILVER layer in S3 (Parquet with Snappy compression)
    logger.info(f"Writing to SILVER layer: {args['target_s3_path']}")
    glueContext.write_dynamic_frame.from_options(
        frame=silver_dyf,
        connection_type="s3",
        connection_options={
            "path": args['target_s3_path'],
            "partitionKeys": ["partition_year", "partition_month", "partition_day"]
        },
        format="parquet",
        format_options={
            "compression": "snappy"
        },
        transformation_ctx="write_silver"
    )

    # Update Data Catalog
    logger.info(f"Updating Data Catalog: {args['target_database']}.{args['target_table']}")
    glueContext.write_dynamic_frame.from_catalog(
        frame=silver_dyf,
        database=args['target_database'],
        table_name=args['target_table'],
        transformation_ctx="catalog_silver"
    )

    # Log statistics
    logger.info("=" * 80)
    logger.info("TRANSFORMATION STATISTICS")
    logger.info(f"Raw records: {raw_df.count()}")
    logger.info(f"Silver records: {silver_df.count()}")
    logger.info(f"Records dropped: {raw_df.count() - silver_df.count()}")
    logger.info("=" * 80)

    job.commit()
    logger.info("Job completed successfully!")

except Exception as e:
    logger.error(f"Job failed with error: {str(e)}")
    raise e
