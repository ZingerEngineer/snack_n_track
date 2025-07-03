import os
import torch
import logging
from typing import Optional, List, Tuple, Dict, Any
from ultralytics import YOLO
from pathlib import Path

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class YOLOModelService:
    """Service class for YOLO model operations"""
    
    def __init__(self, model_path: str, device: Optional[str] = None):
        """
        Initialize the YOLO model service
        
        Args:
            model_path: Path to the YOLO model file
            device: Device to use ('cpu', 'cuda', or None for auto-detection)
        """
        self.model_path = model_path
        self.device = device or ("cuda" if torch.cuda.is_available() else "cpu")
        self.model: Optional[YOLO] = None
        self.class_names: Dict[int, str] = {}
        
        logger.info(f"Initializing YOLO service with device: {self.device}")
        
    def load_model(self) -> None:
        """Load the YOLO model"""
        try:
            if not os.path.exists(self.model_path):
                raise FileNotFoundError(f"Model file not found: {self.model_path}")
                
            logger.info(f"Loading YOLO model from: {self.model_path}")
            self.model = YOLO(self.model_path).to(self.device)
            
            # Extract class names if available
            if hasattr(self.model, 'names') and self.model.names:
                self.class_names = self.model.names
                logger.info(f"Loaded {len(self.class_names)} class names")
            else:
                logger.warning("No class names found in model")
                
        except Exception as e:
            logger.error(f"Failed to load model: {str(e)}")
            raise
            
    def is_model_loaded(self) -> bool:
        """Check if model is loaded"""
        return self.model is not None
        
    def get_class_name(self, class_index: int) -> str:
        """Get class name by index"""
        return self.class_names.get(class_index, f"class_{class_index}")
        
    def predict(self, image_path: str, confidence_threshold: float = 0.5) -> List[Dict[str, Any]]:
        """
        Run inference on an image
        
        Args:
            image_path: Path to the image file
            confidence_threshold: Minimum confidence threshold
            
        Returns:
            List of detection results
        """
        if not self.model:
            raise RuntimeError("Model not loaded. Call load_model() first.")
            
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image file not found: {image_path}")
            
        try:
            logger.info(f"Running inference on: {image_path}")
            
            # Run inference
            results = self.model(image_path, conf=confidence_threshold)
            
            detections = []
            for r in results:
                if r.boxes is not None:
                    # Extract detection information
                    boxes = r.boxes.xyxy.cpu().numpy()  # Bounding boxes
                    confidences = r.boxes.conf.cpu().numpy()  # Confidence scores
                    class_indices = r.boxes.cls.cpu().numpy().astype(int)  # Class indices
                    
                    for i, (box, conf, cls_idx) in enumerate(zip(boxes, confidences, class_indices)):
                        detection = {
                            "class_index": int(cls_idx),
                            "class_name": self.get_class_name(cls_idx),
                            "confidence": float(conf),
                            "bounding_box": box.tolist()
                        }
                        detections.append(detection)
                        
            logger.info(f"Found {len(detections)} detections above threshold {confidence_threshold}")
            return detections
            
        except Exception as e:
            logger.error(f"Inference failed: {str(e)}")
            raise
            
    def get_model_info(self) -> Dict[str, Any]:
        """Get model information"""
        return {
            "model_path": self.model_path,
            "device": self.device,
            "loaded": self.is_model_loaded(),
            "num_classes": len(self.class_names),
            "class_names": self.class_names
        }
