export type ServiceStatus = 'healthy' | 'degraded' | 'down' | 'unknown'

export interface AWSService {
  id: string
  name: string
  type: string
  status: ServiceStatus
  region: string
  resourceCount: number
  lastChecked: string
  cost?: number
  metrics?: ServiceMetrics
}

export interface ServiceMetrics {
  cpu?: number
  memory?: number
  requests?: number
  errors?: number
  latency?: number
}

export interface EC2Instance {
  instanceId: string
  instanceType: string
  state: string
  publicIp?: string
  privateIp: string
  launchTime: string
  tags: Record<string, string>
}

export interface S3Bucket {
  name: string
  creationDate: string
  region: string
  sizeBytes: number
  objectCount: number
}

export interface LambdaFunction {
  functionName: string
  runtime: string
  memorySize: number
  timeout: number
  lastModified: string
  codeSize: number
  invocations?: number
}

export interface RDSInstance {
  dbInstanceIdentifier: string
  dbInstanceClass: string
  engine: string
  engineVersion: string
  dbInstanceStatus: string
  allocatedStorage: number
  endpoint?: string
}

export interface DynamoDBTable {
  tableName: string
  status: string
  itemCount: number
  tableSizeBytes: number
  readCapacity: number
  writeCapacity: number
  creationDateTime: string
}

export interface ECSCluster {
  clusterName: string
  status: string
  runningTasksCount: number
  pendingTasksCount: number
  activeServicesCount: number
  registeredContainerInstancesCount: number
}

export interface CloudWatchAlarm {
  alarmName: string
  stateValue: string
  stateReason: string
  metricName: string
  namespace: string
  threshold: number
}

export interface CostData {
  service: string
  cost: number
  currency: string
  startDate: string
  endDate: string
}

export interface ServiceHealthCheck {
  serviceName: string
  status: ServiceStatus
  latency: number
  timestamp: string
  message?: string
}
