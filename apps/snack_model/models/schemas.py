from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
from enum import Enum

class RequestStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class DetectionResult(BaseModel):
    class_index: int = Field(..., description="Index of the detected class")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confidence score between 0 and 1")

class ScanRequest(BaseModel):
    request_id: str = Field(..., min_length=1, max_length=100, description="Unique identifier for the request")
    image_url: HttpUrl = Field(..., description="URL of the image to process")
    confidence_threshold: float = Field(0.5, ge=0.1, le=1.0, description="Minimum confidence threshold for detections")

class ScanResponse(BaseModel):
    request_id: str = Field(..., description="Request identifier")
    status: RequestStatus = Field(..., description="Processing status")
    detections: List[DetectionResult] = Field(default_factory=list, description="List of detected objects")
    processing_time: Optional[float] = Field(None, description="Processing time in seconds")
    image_path: Optional[str] = Field(None, description="Local path where image was saved")
    error_message: Optional[str] = Field(None, description="Error message if processing failed")

class HealthResponse(BaseModel):
    status: str = Field(..., description="Service health status")
    model_loaded: bool = Field(..., description="Whether the AI model is loaded")
    device: str = Field(..., description="Device being used (cpu/cuda)")
    version: str = Field(..., description="API version")

class ErrorResponse(BaseModel):
    error: str = Field(..., description="Error type")
    message: str = Field(..., description="Error message")
    request_id: Optional[str] = Field(None, description="Request ID if available")
