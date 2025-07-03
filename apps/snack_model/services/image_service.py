import os
import httpx
import aiofiles
import logging
from typing import Optional
from pathlib import Path
from urllib.parse import urlparse

logger = logging.getLogger(__name__)

class ImageDownloadService:
    """Service for downloading images from URLs"""
    
    def __init__(self, download_dir: str = "downloads"):
        """
        Initialize the image download service
        
        Args:
            download_dir: Directory to save downloaded images
        """
        self.download_dir = Path(download_dir)
        self.download_dir.mkdir(exist_ok=True)
        
        # Supported image formats
        self.supported_formats = {'.jpg', '.jpeg', '.png', '.webp'}
        
    async def download_image(self, image_url: str, request_id: str) -> str:
        """
        Download an image from URL
        
        Args:
            image_url: URL of the image to download
            request_id: Unique request identifier
            
        Returns:
            Local file path of downloaded image
        """
        try:
            # Parse URL to get file extension
            parsed_url = urlparse(str(image_url))
            original_filename = Path(parsed_url.path).name
            
            # Generate safe filename
            if original_filename:
                # Keep original extension if valid
                extension = Path(original_filename).suffix.lower()
                if extension not in self.supported_formats:
                    extension = '.jpg'  # Default extension
            else:
                extension = '.jpg'
                
            filename = f"{request_id}{extension}"
            file_path = self.download_dir / filename
            
            logger.info(f"Downloading image from {image_url} to {file_path}")
            
            # Download the image
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.get(str(image_url))
                response.raise_for_status()
                
                # Validate content type
                content_type = response.headers.get('content-type', '')
                if not content_type.startswith('image/'):
                    raise ValueError(f"Invalid content type: {content_type}")
                
                # Save the image
                async with aiofiles.open(file_path, 'wb') as f:
                    await f.write(response.content)
                    
            logger.info(f"Image downloaded successfully: {file_path}")
            return str(file_path)
            
        except httpx.HTTPError as e:
            logger.error(f"HTTP error downloading image: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Failed to download image: {str(e)}")
            raise
            
    def cleanup_image(self, file_path: str) -> None:
        """
        Clean up downloaded image file
        
        Args:
            file_path: Path to the file to delete
        """
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                logger.info(f"Cleaned up image file: {file_path}")
        except Exception as e:
            logger.warning(f"Failed to cleanup image {file_path}: {str(e)}")
            