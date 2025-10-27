"""
AWS Glue Job: SILVER to GOLD Layer Transformation
Applies business logic, creates aggregations, and joins dimensions
"""

import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job
from pyspark.sql.functions import *
from pyspark.sql.window import Window
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

args = getResolvedOptions(sys.argv, [
    'JOB_NAME',
    'orders_database',
    'orders_table',
    'customers_database',
    'customers_table',
    'products_database',
    'products_table',
    'target_s3_path',
    'target_database',
    'target_table'
])

sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

logger.info("Starting SILVER to GOLD transformation")

try:
    # Read SILVER tables
    logger.info("Reading SILVER layer tables...")

    orders_df = glueContext.create_dynamic_frame.from_catalog(
        database=args['orders_database'],
        table_name=args['orders_table']
    ).toDF()

    customers_df = glueContext.create_dynamic_frame.from_catalog(
        database=args['customers_database'],
        table_name=args['customers_table']
    ).toDF()

    products_df = glueContext.create_dynamic_frame.from_catalog(
        database=args['products_database'],
        table_name=args['products_table']
    ).toDF()

    logger.info(f"Orders: {orders_df.count()}, Customers: {customers_df.count()}, Products: {products_df.count()}")

    # Business Logic: Enrich orders with customer and product information
    logger.info("Applying business logic and joins...")

    gold_df = orders_df.alias('o') \
        .join(customers_df.alias('c'), col('o.customer_id') == col('c.customer_id'), 'left') \
        .join(products_df.alias('p'), col('o.product_id') == col('p.product_id'), 'left')

    # Calculate derived metrics
    logger.info("Calculating derived metrics...")

    gold_df = gold_df.select(
        col('o.order_id'),
        col('o.customer_id'),
        col('o.product_id'),
        col('o.order_date'),
        col('o.amount').alias('sales_amount'),
        col('p.cost').alias('cost_amount'),
        (col('o.amount') - col('p.cost')).alias('profit_amount'),
        (((col('o.amount') - col('p.cost')) / col('o.amount')) * 100).alias('profit_margin_pct'),
        col('o.quantity'),
        col('o.status'),
        col('o.payment_method'),
        col('c.name').alias('customer_name'),
        col('c.email').alias('customer_email'),
        col('c.region'),
        col('c.country'),
        col('c.customer_segment'),
        col('p.product_name'),
        col('p.category'),
        col('p.subcategory'),
        col('p.brand'),
        year(col('o.order_date')).alias('order_year'),
        quarter(col('o.order_date')).alias('order_quarter'),
        month(col('o.order_date')).alias('order_month'),
        weekofyear(col('o.order_date')).alias('order_week'),
        dayofweek(col('o.order_date')).alias('order_day_of_week')
    )

    # Add customer segmentation based on behavior
    logger.info("Adding customer segmentation...")

    # Calculate customer lifetime metrics using window functions
    customer_window = Window.partitionBy('customer_id')

    gold_df = gold_df.withColumn('customer_total_orders',
        count('order_id').over(customer_window))
    gold_df = gold_df.withColumn('customer_total_spent',
        sum('sales_amount').over(customer_window))
    gold_df = gold_df.withColumn('customer_avg_order_value',
        avg('sales_amount').over(customer_window))

    # Customer tier classification
    gold_df = gold_df.withColumn(
        'customer_tier',
        when(col('customer_total_orders') >= 10, 'VIP')
        .when(col('customer_total_orders') >= 5, 'Regular')
        .when(col('customer_total_orders') >= 1, 'Occasional')
        .otherwise('New')
    )

    # Product performance metrics
    logger.info("Adding product performance metrics...")

    product_window = Window.partitionBy('product_id')

    gold_df = gold_df.withColumn('product_total_sales',
        sum('sales_amount').over(product_window))
    gold_df = gold_df.withColumn('product_total_quantity',
        sum('quantity').over(product_window))
    gold_df = gold_df.withColumn('product_avg_profit_margin',
        avg('profit_margin_pct').over(product_window))

    # Add data quality flags
    gold_df = gold_df.withColumn(
        'data_quality_flag',
        when((col('sales_amount').isNull()) | (col('customer_id').isNull()), 'POOR')
        .when(col('profit_margin_pct') < 0, 'REVIEW')
        .otherwise('GOOD')
    )

    # Add metadata
    gold_df = gold_df.withColumn('gold_processed_timestamp', current_timestamp())
    gold_df = gold_df.withColumn('gold_processing_date', current_date())

    logger.info(f"GOLD records created: {gold_df.count()}")

    # Convert to DynamicFrame
    gold_dyf = DynamicFrame.fromDF(gold_df, glueContext, "gold_dyf")

    # Write to GOLD layer
    logger.info(f"Writing to GOLD layer: {args['target_s3_path']}")
    glueContext.write_dynamic_frame.from_options(
        frame=gold_dyf,
        connection_type="s3",
        connection_options={
            "path": args['target_s3_path'],
            "partitionKeys": ["order_year", "order_month"]
        },
        format="parquet",
        format_options={
            "compression": "snappy"
        },
        transformation_ctx="write_gold"
    )

    # Update Data Catalog
    logger.info("Updating Data Catalog...")
    glueContext.write_dynamic_frame.from_catalog(
        frame=gold_dyf,
        database=args['target_database'],
        table_name=args['target_table'],
        transformation_ctx="catalog_gold"
    )

    # Log statistics
    logger.info("=" * 80)
    logger.info("GOLD LAYER STATISTICS")
    logger.info(f"Total records: {gold_df.count()}")
    logger.info(f"Date range: {gold_df.agg(min('order_date'), max('order_date')).collect()[0]}")
    logger.info(f"Total sales: ${gold_df.agg(sum('sales_amount')).collect()[0][0]:,.2f}")
    logger.info(f"Total profit: ${gold_df.agg(sum('profit_amount')).collect()[0][0]:,.2f}")
    logger.info("=" * 80)

    job.commit()
    logger.info("Job completed successfully!")

except Exception as e:
    logger.error(f"Job failed with error: {str(e)}")
    raise e
