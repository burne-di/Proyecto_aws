"""Pydantic models for AWS services"""

from pydantic import BaseModel, Field
from typing import Optional, Dict, Literal
from datetime import datetime


ServiceStatus = Literal['healthy', 'degraded', 'down', 'unknown']


class ServiceMetrics(BaseModel):
    cpu: Optional[float] = None
    memory: Optional[float] = None
    requests: Optional[int] = None
    errors: Optional[int] = None
    latency: Optional[float] = None


class AWSService(BaseModel):
    id: str
    name: str
    type: str
    status: ServiceStatus
    region: str
    resource_count: int = Field(alias='resourceCount')
    last_checked: str = Field(alias='lastChecked')
    cost: Optional[float] = None
    metrics: Optional[ServiceMetrics] = None

    class Config:
        populate_by_name = True


class EC2Instance(BaseModel):
    instance_id: str = Field(alias='instanceId')
    instance_type: str = Field(alias='instanceType')
    state: str
    public_ip: Optional[str] = Field(None, alias='publicIp')
    private_ip: str = Field(alias='privateIp')
    launch_time: str = Field(alias='launchTime')
    tags: Dict[str, str]

    class Config:
        populate_by_name = True


class S3Bucket(BaseModel):
    name: str
    creation_date: str = Field(alias='creationDate')
    region: str
    size_bytes: int = Field(alias='sizeBytes')
    object_count: int = Field(alias='objectCount')

    class Config:
        populate_by_name = True


class LambdaFunction(BaseModel):
    function_name: str = Field(alias='functionName')
    runtime: str
    memory_size: int = Field(alias='memorySize')
    timeout: int
    last_modified: str = Field(alias='lastModified')
    code_size: int = Field(alias='codeSize')
    invocations: Optional[int] = None

    class Config:
        populate_by_name = True


class RDSInstance(BaseModel):
    db_instance_identifier: str = Field(alias='dbInstanceIdentifier')
    db_instance_class: str = Field(alias='dbInstanceClass')
    engine: str
    engine_version: str = Field(alias='engineVersion')
    db_instance_status: str = Field(alias='dbInstanceStatus')
    allocated_storage: int = Field(alias='allocatedStorage')
    endpoint: Optional[str] = None

    class Config:
        populate_by_name = True


class DynamoDBTable(BaseModel):
    table_name: str = Field(alias='tableName')
    status: str
    item_count: int = Field(alias='itemCount')
    table_size_bytes: int = Field(alias='tableSizeBytes')
    read_capacity: int = Field(alias='readCapacity')
    write_capacity: int = Field(alias='writeCapacity')
    creation_date_time: str = Field(alias='creationDateTime')

    class Config:
        populate_by_name = True


class ECSCluster(BaseModel):
    cluster_name: str = Field(alias='clusterName')
    status: str
    running_tasks_count: int = Field(alias='runningTasksCount')
    pending_tasks_count: int = Field(alias='pendingTasksCount')
    active_services_count: int = Field(alias='activeServicesCount')
    registered_container_instances_count: int = Field(alias='registeredContainerInstancesCount')

    class Config:
        populate_by_name = True


class CloudWatchAlarm(BaseModel):
    alarm_name: str = Field(alias='alarmName')
    state_value: str = Field(alias='stateValue')
    state_reason: str = Field(alias='stateReason')
    metric_name: str = Field(alias='metricName')
    namespace: str
    threshold: float

    class Config:
        populate_by_name = True


class CostData(BaseModel):
    service: str
    cost: float
    currency: str
    start_date: str = Field(alias='startDate')
    end_date: str = Field(alias='endDate')

    class Config:
        populate_by_name = True


class ServiceHealthCheck(BaseModel):
    service_name: str = Field(alias='serviceName')
    status: ServiceStatus
    latency: float
    timestamp: str
    message: Optional[str] = None

    class Config:
        populate_by_name = True
