import axios from 'axios'
import type { AWSService, EC2Instance, S3Bucket, LambdaFunction, RDSInstance, DynamoDBTable, ECSCluster, CloudWatchAlarm, CostData } from '../types/aws'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Mock data for GitHub Pages demo
const MOCK_MODE = import.meta.env.VITE_MOCK_MODE === 'true' || true

// Mock data generators
const generateMockServices = (): AWSService[] => {
  const services = [
    { id: 'ec2', name: 'EC2', type: 'Compute' },
    { id: 's3', name: 'S3', type: 'Storage' },
    { id: 'lambda', name: 'Lambda', type: 'Compute' },
    { id: 'rds', name: 'RDS', type: 'Database' },
    { id: 'dynamodb', name: 'DynamoDB', type: 'Database' },
    { id: 'ecs', name: 'ECS', type: 'Containers' },
    { id: 'sqs', name: 'SQS', type: 'Messaging' },
    { id: 'sns', name: 'SNS', type: 'Messaging' },
  ]

  const statuses: Array<'healthy' | 'degraded' | 'down'> = ['healthy', 'healthy', 'healthy', 'degraded']
  const regions = ['us-east-1', 'us-west-2', 'eu-west-1']

  return services.map(svc => ({
    ...svc,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    region: regions[Math.floor(Math.random() * regions.length)],
    resourceCount: Math.floor(Math.random() * 50) + 1,
    lastChecked: new Date().toISOString(),
    cost: Math.random() * 1000,
    metrics: {
      cpu: Math.random() * 100,
      memory: Math.random() * 100,
      requests: Math.floor(Math.random() * 10000),
      errors: Math.floor(Math.random() * 100),
      latency: Math.random() * 500,
    },
  }))
}

// API Functions
export const awsApi = {
  // Services Overview
  async getServices(): Promise<AWSService[]> {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 800))
      return generateMockServices()
    }
    const response = await api.get<AWSService[]>('/services')
    return response.data
  },

  async getServiceHealth(serviceId: string) {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500))
      return {
        serviceName: serviceId,
        status: 'healthy' as const,
        latency: Math.random() * 200,
        timestamp: new Date().toISOString(),
      }
    }
    const response = await api.get(`/services/${serviceId}/health`)
    return response.data
  },

  // EC2
  async getEC2Instances(): Promise<EC2Instance[]> {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 600))
      return Array.from({ length: 5 }, (_, i) => ({
        instanceId: `i-${Math.random().toString(36).substr(2, 9)}`,
        instanceType: ['t2.micro', 't3.medium', 'm5.large'][i % 3],
        state: ['running', 'stopped'][Math.floor(Math.random() * 2)],
        publicIp: `54.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        privateIp: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        launchTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        tags: { Name: `instance-${i + 1}`, Environment: ['prod', 'dev', 'staging'][i % 3] },
      }))
    }
    const response = await api.get<EC2Instance[]>('/ec2/instances')
    return response.data
  },

  // S3
  async getS3Buckets(): Promise<S3Bucket[]> {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 700))
      return Array.from({ length: 8 }, (_, i) => ({
        name: `my-bucket-${i + 1}-${Math.random().toString(36).substr(2, 5)}`,
        creationDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        region: ['us-east-1', 'us-west-2', 'eu-west-1'][i % 3],
        sizeBytes: Math.floor(Math.random() * 10000000000),
        objectCount: Math.floor(Math.random() * 10000),
      }))
    }
    const response = await api.get<S3Bucket[]>('/s3/buckets')
    return response.data
  },

  // Lambda
  async getLambdaFunctions(): Promise<LambdaFunction[]> {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 650))
      return Array.from({ length: 10 }, (_, i) => ({
        functionName: `function-${['dataProcessor', 'imageResizer', 'apiHandler', 'scheduler'][i % 4]}-${i}`,
        runtime: ['python3.11', 'nodejs20.x', 'python3.9'][i % 3],
        memorySize: [128, 256, 512, 1024][i % 4],
        timeout: [30, 60, 300][i % 3],
        lastModified: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
        codeSize: Math.floor(Math.random() * 50000000),
        invocations: Math.floor(Math.random() * 100000),
      }))
    }
    const response = await api.get<LambdaFunction[]>('/lambda/functions')
    return response.data
  },

  // RDS
  async getRDSInstances(): Promise<RDSInstance[]> {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 750))
      return Array.from({ length: 3 }, (_, i) => ({
        dbInstanceIdentifier: `database-${i + 1}`,
        dbInstanceClass: ['db.t3.micro', 'db.t3.medium', 'db.m5.large'][i],
        engine: ['postgres', 'mysql', 'postgres'][i],
        engineVersion: ['14.7', '8.0.32', '15.2'][i],
        dbInstanceStatus: 'available',
        allocatedStorage: [20, 100, 500][i],
        endpoint: `db${i + 1}.example.us-east-1.rds.amazonaws.com`,
      }))
    }
    const response = await api.get<RDSInstance[]>('/rds/instances')
    return response.data
  },

  // DynamoDB
  async getDynamoDBTables(): Promise<DynamoDBTable[]> {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 600))
      return Array.from({ length: 4 }, (_, i) => ({
        tableName: ['users', 'sessions', 'products', 'orders'][i],
        status: 'ACTIVE',
        itemCount: Math.floor(Math.random() * 1000000),
        tableSizeBytes: Math.floor(Math.random() * 1000000000),
        readCapacity: [5, 10, 25, 50][i],
        writeCapacity: [5, 10, 25, 50][i],
        creationDateTime: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      }))
    }
    const response = await api.get<DynamoDBTable[]>('/dynamodb/tables')
    return response.data
  },

  // ECS
  async getECSClusters(): Promise<ECSCluster[]> {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 700))
      return Array.from({ length: 2 }, (_, i) => ({
        clusterName: ['production-cluster', 'staging-cluster'][i],
        status: 'ACTIVE',
        runningTasksCount: Math.floor(Math.random() * 20) + 5,
        pendingTasksCount: Math.floor(Math.random() * 5),
        activeServicesCount: Math.floor(Math.random() * 10) + 2,
        registeredContainerInstancesCount: Math.floor(Math.random() * 10) + 3,
      }))
    }
    const response = await api.get<ECSCluster[]>('/ecs/clusters')
    return response.data
  },

  // CloudWatch
  async getCloudWatchAlarms(): Promise<CloudWatchAlarm[]> {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 550))
      return Array.from({ length: 6 }, (_, i) => ({
        alarmName: `alarm-${['high-cpu', 'low-memory', 'high-latency', 'error-rate'][i % 4]}-${i}`,
        stateValue: ['OK', 'OK', 'ALARM', 'OK', 'INSUFFICIENT_DATA', 'OK'][i],
        stateReason: `Threshold ${['Crossed', 'Not Crossed'][i % 2]}`,
        metricName: ['CPUUtilization', 'MemoryUtilization', 'Latency', 'ErrorCount'][i % 4],
        namespace: 'AWS/EC2',
        threshold: [80, 85, 1000, 50][i % 4],
      }))
    }
    const response = await api.get<CloudWatchAlarm[]>('/cloudwatch/alarms')
    return response.data
  },

  // Cost
  async getCostData(): Promise<CostData[]> {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 800))
      const services = ['EC2', 'S3', 'Lambda', 'RDS', 'DynamoDB', 'ECS', 'CloudWatch', 'Data Transfer']
      return services.map(service => ({
        service,
        cost: Math.random() * 500 + 50,
        currency: 'USD',
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date().toISOString(),
      }))
    }
    const response = await api.get<CostData[]>('/costs')
    return response.data
  },
}

export default api
