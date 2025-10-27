"""AWS Services Integration Layer"""

import boto3
import logging
from datetime import datetime, timedelta
from typing import List
import os
from botocore.exceptions import ClientError, NoCredentialsError

from app.models import (
    AWSService,
    EC2Instance,
    S3Bucket,
    LambdaFunction,
    RDSInstance,
    DynamoDBTable,
    ECSCluster,
    CloudWatchAlarm,
    CostData,
    ServiceHealthCheck,
    ServiceMetrics
)

logger = logging.getLogger(__name__)


class AWSServiceManager:
    """Manager for AWS services integration"""

    def __init__(self):
        self.region = os.getenv('AWS_REGION', 'us-east-1')
        self.use_mock = os.getenv('USE_MOCK_DATA', 'true').lower() == 'true'

        if not self.use_mock:
            try:
                self.ec2_client = boto3.client('ec2', region_name=self.region)
                self.s3_client = boto3.client('s3')
                self.lambda_client = boto3.client('lambda', region_name=self.region)
                self.rds_client = boto3.client('rds', region_name=self.region)
                self.dynamodb_client = boto3.client('dynamodb', region_name=self.region)
                self.ecs_client = boto3.client('ecs', region_name=self.region)
                self.cloudwatch_client = boto3.client('cloudwatch', region_name=self.region)
                self.cost_client = boto3.client('ce', region_name=self.region)
                logger.info("AWS clients initialized successfully")
            except NoCredentialsError:
                logger.warning("AWS credentials not found, using mock data")
                self.use_mock = True

    async def get_all_services(self) -> List[AWSService]:
        """Get overview of all AWS services"""
        if self.use_mock:
            return self._get_mock_services()

        services = []
        service_checks = [
            ('ec2', 'EC2', 'Compute'),
            ('s3', 'S3', 'Storage'),
            ('lambda', 'Lambda', 'Compute'),
            ('rds', 'RDS', 'Database'),
            ('dynamodb', 'DynamoDB', 'Database'),
            ('ecs', 'ECS', 'Containers'),
        ]

        for service_id, name, type_ in service_checks:
            try:
                resource_count = await self._get_resource_count(service_id)
                services.append(AWSService(
                    id=service_id,
                    name=name,
                    type=type_,
                    status='healthy',
                    region=self.region,
                    resourceCount=resource_count,
                    lastChecked=datetime.utcnow().isoformat(),
                ))
            except Exception as e:
                logger.error(f"Error checking {service_id}: {str(e)}")
                services.append(AWSService(
                    id=service_id,
                    name=name,
                    type=type_,
                    status='unknown',
                    region=self.region,
                    resourceCount=0,
                    lastChecked=datetime.utcnow().isoformat(),
                ))

        return services

    async def _get_resource_count(self, service_id: str) -> int:
        """Get resource count for a specific service"""
        try:
            if service_id == 'ec2':
                response = self.ec2_client.describe_instances()
                return sum(len(r['Instances']) for r in response['Reservations'])
            elif service_id == 's3':
                response = self.s3_client.list_buckets()
                return len(response['Buckets'])
            elif service_id == 'lambda':
                response = self.lambda_client.list_functions()
                return len(response['Functions'])
            elif service_id == 'rds':
                response = self.rds_client.describe_db_instances()
                return len(response['DBInstances'])
            elif service_id == 'dynamodb':
                response = self.dynamodb_client.list_tables()
                return len(response['TableNames'])
            elif service_id == 'ecs':
                response = self.ecs_client.list_clusters()
                return len(response['clusterArns'])
            return 0
        except Exception as e:
            logger.error(f"Error getting resource count for {service_id}: {str(e)}")
            return 0

    async def check_service_health(self, service_id: str) -> ServiceHealthCheck:
        """Check health of a specific service"""
        start_time = datetime.utcnow()

        try:
            # Perform service-specific health check
            await self._get_resource_count(service_id)
            latency = (datetime.utcnow() - start_time).total_seconds() * 1000

            return ServiceHealthCheck(
                serviceName=service_id,
                status='healthy',
                latency=latency,
                timestamp=datetime.utcnow().isoformat(),
            )
        except Exception as e:
            latency = (datetime.utcnow() - start_time).total_seconds() * 1000
            return ServiceHealthCheck(
                serviceName=service_id,
                status='down',
                latency=latency,
                timestamp=datetime.utcnow().isoformat(),
                message=str(e),
            )

    async def get_ec2_instances(self) -> List[EC2Instance]:
        """Get all EC2 instances"""
        if self.use_mock:
            return self._get_mock_ec2_instances()

        instances = []
        try:
            response = self.ec2_client.describe_instances()
            for reservation in response['Reservations']:
                for instance in reservation['Instances']:
                    tags = {tag['Key']: tag['Value'] for tag in instance.get('Tags', [])}
                    instances.append(EC2Instance(
                        instanceId=instance['InstanceId'],
                        instanceType=instance['InstanceType'],
                        state=instance['State']['Name'],
                        publicIp=instance.get('PublicIpAddress'),
                        privateIp=instance.get('PrivateIpAddress', ''),
                        launchTime=instance['LaunchTime'].isoformat(),
                        tags=tags,
                    ))
        except Exception as e:
            logger.error(f"Error fetching EC2 instances: {str(e)}")

        return instances

    async def get_s3_buckets(self) -> List[S3Bucket]:
        """Get all S3 buckets"""
        if self.use_mock:
            return self._get_mock_s3_buckets()

        buckets = []
        try:
            response = self.s3_client.list_buckets()
            for bucket in response['Buckets']:
                try:
                    location = self.s3_client.get_bucket_location(Bucket=bucket['Name'])
                    region = location['LocationConstraint'] or 'us-east-1'

                    # Get bucket size (simplified - in production use CloudWatch metrics)
                    size_bytes = 0
                    object_count = 0

                    buckets.append(S3Bucket(
                        name=bucket['Name'],
                        creationDate=bucket['CreationDate'].isoformat(),
                        region=region,
                        sizeBytes=size_bytes,
                        objectCount=object_count,
                    ))
                except Exception as e:
                    logger.error(f"Error getting details for bucket {bucket['Name']}: {str(e)}")
        except Exception as e:
            logger.error(f"Error fetching S3 buckets: {str(e)}")

        return buckets

    async def get_lambda_functions(self) -> List[LambdaFunction]:
        """Get all Lambda functions"""
        if self.use_mock:
            return self._get_mock_lambda_functions()

        functions = []
        try:
            response = self.lambda_client.list_functions()
            for func in response['Functions']:
                functions.append(LambdaFunction(
                    functionName=func['FunctionName'],
                    runtime=func.get('Runtime', 'unknown'),
                    memorySize=func['MemorySize'],
                    timeout=func['Timeout'],
                    lastModified=func['LastModified'],
                    codeSize=func['CodeSize'],
                ))
        except Exception as e:
            logger.error(f"Error fetching Lambda functions: {str(e)}")

        return functions

    async def get_rds_instances(self) -> List[RDSInstance]:
        """Get all RDS instances"""
        if self.use_mock:
            return self._get_mock_rds_instances()

        instances = []
        try:
            response = self.rds_client.describe_db_instances()
            for db in response['DBInstances']:
                endpoint = None
                if 'Endpoint' in db:
                    endpoint = db['Endpoint']['Address']

                instances.append(RDSInstance(
                    dbInstanceIdentifier=db['DBInstanceIdentifier'],
                    dbInstanceClass=db['DBInstanceClass'],
                    engine=db['Engine'],
                    engineVersion=db['EngineVersion'],
                    dbInstanceStatus=db['DBInstanceStatus'],
                    allocatedStorage=db['AllocatedStorage'],
                    endpoint=endpoint,
                ))
        except Exception as e:
            logger.error(f"Error fetching RDS instances: {str(e)}")

        return instances

    async def get_dynamodb_tables(self) -> List[DynamoDBTable]:
        """Get all DynamoDB tables"""
        if self.use_mock:
            return self._get_mock_dynamodb_tables()

        tables = []
        try:
            response = self.dynamodb_client.list_tables()
            for table_name in response['TableNames']:
                try:
                    table_desc = self.dynamodb_client.describe_table(TableName=table_name)
                    table = table_desc['Table']

                    tables.append(DynamoDBTable(
                        tableName=table['TableName'],
                        status=table['TableStatus'],
                        itemCount=table.get('ItemCount', 0),
                        tableSizeBytes=table.get('TableSizeBytes', 0),
                        readCapacity=table.get('ProvisionedThroughput', {}).get('ReadCapacityUnits', 0),
                        writeCapacity=table.get('ProvisionedThroughput', {}).get('WriteCapacityUnits', 0),
                        creationDateTime=table['CreationDateTime'].isoformat(),
                    ))
                except Exception as e:
                    logger.error(f"Error getting details for table {table_name}: {str(e)}")
        except Exception as e:
            logger.error(f"Error fetching DynamoDB tables: {str(e)}")

        return tables

    async def get_ecs_clusters(self) -> List[ECSCluster]:
        """Get all ECS clusters"""
        if self.use_mock:
            return self._get_mock_ecs_clusters()

        clusters = []
        try:
            response = self.ecs_client.list_clusters()
            if response['clusterArns']:
                cluster_details = self.ecs_client.describe_clusters(clusters=response['clusterArns'])
                for cluster in cluster_details['clusters']:
                    clusters.append(ECSCluster(
                        clusterName=cluster['clusterName'],
                        status=cluster['status'],
                        runningTasksCount=cluster['runningTasksCount'],
                        pendingTasksCount=cluster['pendingTasksCount'],
                        activeServicesCount=cluster['activeServicesCount'],
                        registeredContainerInstancesCount=cluster['registeredContainerInstancesCount'],
                    ))
        except Exception as e:
            logger.error(f"Error fetching ECS clusters: {str(e)}")

        return clusters

    async def get_cloudwatch_alarms(self) -> List[CloudWatchAlarm]:
        """Get all CloudWatch alarms"""
        if self.use_mock:
            return self._get_mock_cloudwatch_alarms()

        alarms = []
        try:
            response = self.cloudwatch_client.describe_alarms()
            for alarm in response['MetricAlarms']:
                alarms.append(CloudWatchAlarm(
                    alarmName=alarm['AlarmName'],
                    stateValue=alarm['StateValue'],
                    stateReason=alarm.get('StateReason', ''),
                    metricName=alarm.get('MetricName', ''),
                    namespace=alarm.get('Namespace', ''),
                    threshold=alarm.get('Threshold', 0),
                ))
        except Exception as e:
            logger.error(f"Error fetching CloudWatch alarms: {str(e)}")

        return alarms

    async def get_cost_data(self) -> List[CostData]:
        """Get cost data for all services"""
        if self.use_mock:
            return self._get_mock_cost_data()

        costs = []
        try:
            end_date = datetime.utcnow().date()
            start_date = end_date - timedelta(days=30)

            response = self.cost_client.get_cost_and_usage(
                TimePeriod={
                    'Start': start_date.isoformat(),
                    'End': end_date.isoformat()
                },
                Granularity='MONTHLY',
                Metrics=['UnblendedCost'],
                GroupBy=[{'Type': 'DIMENSION', 'Key': 'SERVICE'}]
            )

            for result in response['ResultsByTime']:
                for group in result['Groups']:
                    service = group['Keys'][0]
                    cost = float(group['Metrics']['UnblendedCost']['Amount'])

                    costs.append(CostData(
                        service=service,
                        cost=cost,
                        currency='USD',
                        startDate=start_date.isoformat(),
                        endDate=end_date.isoformat(),
                    ))
        except Exception as e:
            logger.error(f"Error fetching cost data: {str(e)}")

        return costs

    # Mock data methods
    def _get_mock_services(self) -> List[AWSService]:
        """Generate mock services data"""
        import random
        services_data = [
            ('ec2', 'EC2', 'Compute'),
            ('s3', 'S3', 'Storage'),
            ('lambda', 'Lambda', 'Compute'),
            ('rds', 'RDS', 'Database'),
            ('dynamodb', 'DynamoDB', 'Database'),
            ('ecs', 'ECS', 'Containers'),
        ]

        services = []
        for sid, name, type_ in services_data:
            services.append(AWSService(
                id=sid,
                name=name,
                type=type_,
                status=random.choice(['healthy', 'healthy', 'healthy', 'degraded']),
                region=self.region,
                resourceCount=random.randint(1, 50),
                lastChecked=datetime.utcnow().isoformat(),
                cost=random.uniform(50, 1000),
                metrics=ServiceMetrics(
                    cpu=random.uniform(0, 100),
                    memory=random.uniform(0, 100),
                    requests=random.randint(0, 10000),
                    errors=random.randint(0, 100),
                    latency=random.uniform(0, 500),
                ),
            ))
        return services

    def _get_mock_ec2_instances(self) -> List[EC2Instance]:
        """Generate mock EC2 instances"""
        import random
        instances = []
        for i in range(5):
            instances.append(EC2Instance(
                instanceId=f"i-{random.randint(100000, 999999):06x}",
                instanceType=random.choice(['t2.micro', 't3.medium', 'm5.large']),
                state=random.choice(['running', 'stopped']),
                publicIp=f"54.{random.randint(0, 255)}.{random.randint(0, 255)}.{random.randint(0, 255)}",
                privateIp=f"10.0.{random.randint(0, 255)}.{random.randint(0, 255)}",
                launchTime=(datetime.utcnow() - timedelta(days=random.randint(1, 30))).isoformat(),
                tags={'Name': f'instance-{i+1}', 'Environment': random.choice(['prod', 'dev', 'staging'])},
            ))
        return instances

    def _get_mock_s3_buckets(self) -> List[S3Bucket]:
        """Generate mock S3 buckets"""
        import random
        buckets = []
        for i in range(8):
            buckets.append(S3Bucket(
                name=f"my-bucket-{i+1}-{random.randint(10000, 99999)}",
                creationDate=(datetime.utcnow() - timedelta(days=random.randint(1, 365))).isoformat(),
                region=random.choice(['us-east-1', 'us-west-2', 'eu-west-1']),
                sizeBytes=random.randint(1000000, 10000000000),
                objectCount=random.randint(100, 10000),
            ))
        return buckets

    def _get_mock_lambda_functions(self) -> List[LambdaFunction]:
        """Generate mock Lambda functions"""
        import random
        functions = []
        for i in range(10):
            functions.append(LambdaFunction(
                functionName=f"function-{random.choice(['dataProcessor', 'imageResizer', 'apiHandler'])}-{i}",
                runtime=random.choice(['python3.11', 'nodejs20.x', 'python3.9']),
                memorySize=random.choice([128, 256, 512, 1024]),
                timeout=random.choice([30, 60, 300]),
                lastModified=(datetime.utcnow() - timedelta(days=random.randint(1, 60))).isoformat(),
                codeSize=random.randint(1000000, 50000000),
                invocations=random.randint(1000, 100000),
            ))
        return functions

    def _get_mock_rds_instances(self) -> List[RDSInstance]:
        """Generate mock RDS instances"""
        instances = [
            RDSInstance(
                dbInstanceIdentifier='database-1',
                dbInstanceClass='db.t3.micro',
                engine='postgres',
                engineVersion='14.7',
                dbInstanceStatus='available',
                allocatedStorage=20,
                endpoint='db1.example.us-east-1.rds.amazonaws.com',
            ),
            RDSInstance(
                dbInstanceIdentifier='database-2',
                dbInstanceClass='db.t3.medium',
                engine='mysql',
                engineVersion='8.0.32',
                dbInstanceStatus='available',
                allocatedStorage=100,
                endpoint='db2.example.us-east-1.rds.amazonaws.com',
            ),
        ]
        return instances

    def _get_mock_dynamodb_tables(self) -> List[DynamoDBTable]:
        """Generate mock DynamoDB tables"""
        import random
        tables = []
        for name in ['users', 'sessions', 'products', 'orders']:
            tables.append(DynamoDBTable(
                tableName=name,
                status='ACTIVE',
                itemCount=random.randint(1000, 1000000),
                tableSizeBytes=random.randint(1000000, 1000000000),
                readCapacity=random.choice([5, 10, 25, 50]),
                writeCapacity=random.choice([5, 10, 25, 50]),
                creationDateTime=(datetime.utcnow() - timedelta(days=random.randint(1, 365))).isoformat(),
            ))
        return tables

    def _get_mock_ecs_clusters(self) -> List[ECSCluster]:
        """Generate mock ECS clusters"""
        import random
        clusters = [
            ECSCluster(
                clusterName='production-cluster',
                status='ACTIVE',
                runningTasksCount=random.randint(5, 25),
                pendingTasksCount=random.randint(0, 5),
                activeServicesCount=random.randint(2, 12),
                registeredContainerInstancesCount=random.randint(3, 13),
            ),
            ECSCluster(
                clusterName='staging-cluster',
                status='ACTIVE',
                runningTasksCount=random.randint(2, 10),
                pendingTasksCount=random.randint(0, 3),
                activeServicesCount=random.randint(1, 6),
                registeredContainerInstancesCount=random.randint(2, 8),
            ),
        ]
        return clusters

    def _get_mock_cloudwatch_alarms(self) -> List[CloudWatchAlarm]:
        """Generate mock CloudWatch alarms"""
        import random
        alarms = []
        for i in range(6):
            alarms.append(CloudWatchAlarm(
                alarmName=f"alarm-{random.choice(['high-cpu', 'low-memory', 'high-latency', 'error-rate'])}-{i}",
                stateValue=random.choice(['OK', 'OK', 'ALARM', 'OK', 'INSUFFICIENT_DATA', 'OK']),
                stateReason=f"Threshold {random.choice(['Crossed', 'Not Crossed'])}",
                metricName=random.choice(['CPUUtilization', 'MemoryUtilization', 'Latency', 'ErrorCount']),
                namespace='AWS/EC2',
                threshold=random.choice([80, 85, 1000, 50]),
            ))
        return alarms

    def _get_mock_cost_data(self) -> List[CostData]:
        """Generate mock cost data"""
        import random
        services = ['EC2', 'S3', 'Lambda', 'RDS', 'DynamoDB', 'ECS', 'CloudWatch', 'Data Transfer']
        costs = []
        end_date = datetime.utcnow().date()
        start_date = end_date - timedelta(days=30)

        for service in services:
            costs.append(CostData(
                service=service,
                cost=random.uniform(50, 500),
                currency='USD',
                startDate=start_date.isoformat(),
                endDate=end_date.isoformat(),
            ))
        return costs


# Global instance
aws_service = AWSServiceManager()
