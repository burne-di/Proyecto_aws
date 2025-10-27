"""API endpoint tests"""

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_root_endpoint():
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()
    assert response.json()["message"] == "AWS Services Monitor API"


def test_health_check():
    """Test health check endpoint"""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_get_services():
    """Test get all services endpoint"""
    response = client.get("/api/services")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    if len(response.json()) > 0:
        service = response.json()[0]
        assert "id" in service
        assert "name" in service
        assert "status" in service


def test_get_ec2_instances():
    """Test get EC2 instances endpoint"""
    response = client.get("/api/ec2/instances")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_s3_buckets():
    """Test get S3 buckets endpoint"""
    response = client.get("/api/s3/buckets")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_lambda_functions():
    """Test get Lambda functions endpoint"""
    response = client.get("/api/lambda/functions")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_rds_instances():
    """Test get RDS instances endpoint"""
    response = client.get("/api/rds/instances")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_dynamodb_tables():
    """Test get DynamoDB tables endpoint"""
    response = client.get("/api/dynamodb/tables")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_ecs_clusters():
    """Test get ECS clusters endpoint"""
    response = client.get("/api/ecs/clusters")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_cloudwatch_alarms():
    """Test get CloudWatch alarms endpoint"""
    response = client.get("/api/cloudwatch/alarms")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_cost_data():
    """Test get cost data endpoint"""
    response = client.get("/api/costs")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_service_health_check():
    """Test service health check endpoint"""
    response = client.get("/api/services/ec2/health")
    assert response.status_code == 200
    result = response.json()
    assert "serviceName" in result
    assert "status" in result
    assert "latency" in result
    assert "timestamp" in result
