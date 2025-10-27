"""
AWS Services Monitor Backend API
FastAPI application for monitoring and verifying AWS services
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
from typing import List

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
    ServiceHealthCheck
)
from app.services import aws_service

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    logger.info("Starting AWS Services Monitor API")
    yield
    logger.info("Shutting down AWS Services Monitor API")


# Initialize FastAPI application
app = FastAPI(
    title="AWS Services Monitor API",
    description="Backend API for monitoring and verifying AWS infrastructure services",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint"""
    return {
        "message": "AWS Services Monitor API",
        "version": "1.0.0",
        "docs": "/api/docs"
    }


@app.get("/api/health", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "aws-monitor-api"}


@app.get("/api/services", response_model=List[AWSService], tags=["Services"])
async def get_services():
    """Get all AWS services overview"""
    try:
        services = await aws_service.get_all_services()
        return services
    except Exception as e:
        logger.error(f"Error fetching services: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/services/{service_id}/health", response_model=ServiceHealthCheck, tags=["Services"])
async def get_service_health(service_id: str):
    """Get health status of a specific service"""
    try:
        health = await aws_service.check_service_health(service_id)
        return health
    except Exception as e:
        logger.error(f"Error checking service health: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/ec2/instances", response_model=List[EC2Instance], tags=["EC2"])
async def get_ec2_instances():
    """Get all EC2 instances"""
    try:
        instances = await aws_service.get_ec2_instances()
        return instances
    except Exception as e:
        logger.error(f"Error fetching EC2 instances: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/s3/buckets", response_model=List[S3Bucket], tags=["S3"])
async def get_s3_buckets():
    """Get all S3 buckets"""
    try:
        buckets = await aws_service.get_s3_buckets()
        return buckets
    except Exception as e:
        logger.error(f"Error fetching S3 buckets: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/lambda/functions", response_model=List[LambdaFunction], tags=["Lambda"])
async def get_lambda_functions():
    """Get all Lambda functions"""
    try:
        functions = await aws_service.get_lambda_functions()
        return functions
    except Exception as e:
        logger.error(f"Error fetching Lambda functions: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/rds/instances", response_model=List[RDSInstance], tags=["RDS"])
async def get_rds_instances():
    """Get all RDS instances"""
    try:
        instances = await aws_service.get_rds_instances()
        return instances
    except Exception as e:
        logger.error(f"Error fetching RDS instances: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/dynamodb/tables", response_model=List[DynamoDBTable], tags=["DynamoDB"])
async def get_dynamodb_tables():
    """Get all DynamoDB tables"""
    try:
        tables = await aws_service.get_dynamodb_tables()
        return tables
    except Exception as e:
        logger.error(f"Error fetching DynamoDB tables: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/ecs/clusters", response_model=List[ECSCluster], tags=["ECS"])
async def get_ecs_clusters():
    """Get all ECS clusters"""
    try:
        clusters = await aws_service.get_ecs_clusters()
        return clusters
    except Exception as e:
        logger.error(f"Error fetching ECS clusters: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/cloudwatch/alarms", response_model=List[CloudWatchAlarm], tags=["CloudWatch"])
async def get_cloudwatch_alarms():
    """Get all CloudWatch alarms"""
    try:
        alarms = await aws_service.get_cloudwatch_alarms()
        return alarms
    except Exception as e:
        logger.error(f"Error fetching CloudWatch alarms: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/costs", response_model=List[CostData], tags=["Costs"])
async def get_cost_data():
    """Get cost data for all services"""
    try:
        costs = await aws_service.get_cost_data()
        return costs
    except Exception as e:
        logger.error(f"Error fetching cost data: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
