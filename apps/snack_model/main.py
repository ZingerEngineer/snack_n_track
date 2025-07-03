import time
import logging
from typing import Dict, List
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware

from models.schemas import (
    ScanRequest, 
    ScanResponse, 
    HealthResponse, 
    ErrorResponse,
    RequestStatus,
    DetectionResult
)
from services.model_service import YOLOModelService
from services.image_service import ImageDownloadService

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Global services
model_service: YOLOModelService = None
image_service: ImageDownloadService = None

# Request tracking
active_requests: Dict[str, ScanResponse] = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    global model_service, image_service
    
    logger.info("Starting up Meal Classification API...")
    
    try:
        # Initialize services
        model_service = YOLOModelService(
            model_path="best.pt",  # Update path as needed
            device=None  # Auto-detect device
        )
        
        image_service = ImageDownloadService(download_dir="downloads")
        
        # Load the model
        model_service.load_model()
        
        logger.info("Services initialized successfully")
        
    except Exception as e:
        logger.error(f"Failed to initialize services: {str(e)}")
        raise
        
    yield
    
    logger.info("Shutting down Meal Classification API...")

# Create FastAPI app
app = FastAPI(
    title="Meal Classification API",
    description="AI-powered meal detection and classification service",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/scan", response_model=ScanResponse)
async def scan_meal(request: ScanRequest, background_tasks: BackgroundTasks):
    """
    Scan a meal image for food classification
    
    Args:
        request: Scan request containing image URL and parameters
        background_tasks: FastAPI background tasks
        
    Returns:
        Scan response with detection results
    """
    logger.info(f"Received scan request: {request.request_id}")
    
    # Check if request already exists
    if request.request_id in active_requests:
        return active_requests[request.request_id]
    
    # Initialize response
    response = ScanResponse(
        request_id=request.request_id,
        status=RequestStatus.PENDING
    )
    active_requests[request.request_id] = response
    
    # Process in background
    background_tasks.add_task(
        process_scan_request, 
        request.request_id, 
        str(request.image_url),
        request.confidence_threshold
    )
    
    return response


async def process_scan_request(request_id: str, image_url: str, confidence_threshold: float):
    """
    Background task to process scan request
    
    Args:
        request_id: Request identifier
        image_url: URL of the image to process
        confidence_threshold: Confidence threshold for detections
    """
    start_time = time.time()
    
    try:
        logger.info(f"Processing scan request: {request_id}")
        
        # Update status
        active_requests[request_id].status = RequestStatus.PROCESSING
        
        # Download image
        image_path = await image_service.download_image(image_url, request_id)
        active_requests[request_id].image_path = image_path
        
        # Run inference
        detections_data = model_service.predict(image_path, confidence_threshold)
        
        # Convert to Pydantic models
        detections = [DetectionResult(**detection) for detection in detections_data]
        
        # Update response
        processing_time = time.time() - start_time
        active_requests[request_id].status = RequestStatus.COMPLETED
        active_requests[request_id].detections = detections
        active_requests[request_id].processing_time = processing_time
        
        logger.info(f"Scan completed for {request_id}: {len(detections)} detections in {processing_time:.2f}s")
        
    except Exception as e:
        logger.error(f"Scan failed for {request_id}: {str(e)}")
        
        # Update with error
        active_requests[request_id].status = RequestStatus.FAILED
        active_requests[request_id].error_message = str(e)
        active_requests[request_id].processing_time = time.time() - start_time

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint
    
    Returns:
        Health status and model information
    """
    global model_service
    
    return HealthResponse(
        status="healthy" if model_service and model_service.is_model_loaded() else "unhealthy",
        model_loaded=model_service.is_model_loaded() if model_service else False,
        device=model_service.device if model_service else "unknown",
        version="1.0.0"
    )

@app.get("/status/{request_id}", response_model=ScanResponse)
async def get_scan_status(request_id: str):
    """
    Get the status of a scan request
    
    Args:
        request_id: Request identifier
        
    Returns:
        Current status of the scan request
    """
    if request_id not in active_requests:
        raise HTTPException(status_code=404, detail="Request not found")
    
    return active_requests[request_id]

@app.delete("/cleanup/{request_id}")
async def cleanup_request(request_id: str):
    """
    Clean up a completed request and its associated files
    
    Args:
        request_id: Request identifier
        
    Returns:
        Cleanup confirmation
    """
    if request_id not in active_requests:
        raise HTTPException(status_code=404, detail="Request not found")
    
    request_data = active_requests[request_id]
    
    # Clean up image file if exists
    if request_data.image_path and image_service:
        image_service.cleanup_image(request_data.image_path)
    
    # Remove from active requests
    del active_requests[request_id]
    
    return {"message": f"Request {request_id} cleaned up successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
