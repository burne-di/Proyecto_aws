"""
dbt Pipeline DAG
Dedicated pipeline for running dbt transformations and tests
"""

from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator
from airflow.utils.dates import days_ago
from datetime import timedelta
import logging

logger = logging.getLogger(__name__)

default_args = {
    'owner': 'analytics-team',
    'depends_on_past': False,
    'email': ['analytics@company.com'],
    'email_on_failure': True,
    'retries': 1,
    'retry_delay': timedelta(minutes=3),
}

with DAG(
    'dbt_transformation_pipeline',
    default_args=default_args,
    description='dbt transformation pipeline for Star Schema and OLAP cubes',
    schedule_interval='0 2 * * *',  # Run at 2 AM daily
    start_date=days_ago(1),
    catchup=False,
    tags=['analytics', 'dbt', 'transformations'],
) as dag:

    # Task 1: dbt debug (connection test)
    dbt_debug = BashOperator(
        task_id='dbt_debug',
        bash_command='cd /usr/local/airflow/dbt_redshift && dbt debug --profiles-dir .',
    )

    # Task 2: dbt deps (install dependencies)
    dbt_deps = BashOperator(
        task_id='dbt_deps',
        bash_command='cd /usr/local/airflow/dbt_redshift && dbt deps --profiles-dir .',
    )

    # Task 3: dbt run staging models
    dbt_run_staging = BashOperator(
        task_id='dbt_run_staging',
        bash_command='''
            cd /usr/local/airflow/dbt_redshift && \
            dbt run --profiles-dir . --select staging.*
        ''',
    )

    # Task 4: dbt test staging models
    dbt_test_staging = BashOperator(
        task_id='dbt_test_staging',
        bash_command='''
            cd /usr/local/airflow/dbt_redshift && \
            dbt test --profiles-dir . --select staging.*
        ''',
    )

    # Task 5: dbt run marts (dimensions and facts)
    dbt_run_marts = BashOperator(
        task_id='dbt_run_marts',
        bash_command='''
            cd /usr/local/airflow/dbt_redshift && \
            dbt run --profiles-dir . --select marts.*
        ''',
    )

    # Task 6: dbt test marts
    dbt_test_marts = BashOperator(
        task_id='dbt_test_marts',
        bash_command='''
            cd /usr/local/airflow/dbt_redshift && \
            dbt test --profiles-dir . --select marts.*
        ''',
    )

    # Task 7: dbt run OLAP cubes
    dbt_run_cubes = BashOperator(
        task_id='dbt_run_cubes',
        bash_command='''
            cd /usr/local/airflow/dbt_redshift && \
            dbt run --profiles-dir . --select cubes.*
        ''',
    )

    # Task 8: Generate dbt documentation
    dbt_docs_generate = BashOperator(
        task_id='dbt_docs_generate',
        bash_command='''
            cd /usr/local/airflow/dbt_redshift && \
            dbt docs generate --profiles-dir .
        ''',
    )

    # Task 9: Upload docs to S3
    upload_docs_to_s3 = BashOperator(
        task_id='upload_docs_to_s3',
        bash_command='''
            cd /usr/local/airflow/dbt_redshift/target && \
            aws s3 sync . s3://my-bucket/dbt-docs/ --exclude "*" --include "*.html" --include "*.json"
        ''',
    )

    # Task 10: Run data lineage extraction
    def extract_lineage(**context):
        """Extract data lineage from dbt manifest"""
        logger.info("Extracting data lineage from dbt...")
        # This would parse manifest.json and extract lineage
        return "Lineage extracted"

    extract_lineage_task = PythonOperator(
        task_id='extract_lineage',
        python_callable=extract_lineage,
    )

    # Define dependencies
    dbt_debug >> dbt_deps
    dbt_deps >> dbt_run_staging >> dbt_test_staging
    dbt_test_staging >> dbt_run_marts >> dbt_test_marts
    dbt_test_marts >> dbt_run_cubes
    dbt_run_cubes >> [dbt_docs_generate, extract_lineage_task]
    dbt_docs_generate >> upload_docs_to_s3
