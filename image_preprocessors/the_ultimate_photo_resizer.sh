#!/bin/bash

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null || ! command -v identify &> /dev/null; then
    echo "ImageMagick is required but not installed. Please install ImageMagick first."
    exit 1
fi

# Define the trash directory (standard Linux desktop trash directory)
TRASH_DIR="$HOME/.local/share/Trash/files"

# Ensure the trash directory exists
mkdir -p "$TRASH_DIR"

# Function to move an image to the trash if it's corrupted or too small
move_to_trash() {
    img="$1"
    echo "Moving $img to the trash..."
    mv "$img" "$TRASH_DIR"
}

# Function to resize an image or move to trash if corrupted or too small
resize_or_trash_image() {
    img="$1"
    index="$2"
    total="$3"

    # Display progress
    echo "Processing image $index of $total: $img"

    # Get the image dimensions (width and height)
    dimensions=$(identify -format "%w %h" "$img" 2>/dev/null)

    # If identify failed, move the image to trash
    if [ -z "$dimensions" ]; then
        echo "Image $img seems corrupted or unreadable."
        move_to_trash "$img"
        return
    fi

    width=$(echo $dimensions | cut -d' ' -f1)
    height=$(echo $dimensions | cut -d' ' -f2)

    # Ensure width and height are non-empty and numeric before proceeding
    if ! [[ "$width" =~ ^[0-9]+$ ]] || ! [[ "$height" =~ ^[0-9]+$ ]]; then
        echo "Invalid dimensions for $img: width=$width, height=$height."
        move_to_trash "$img"
        return
    fi

     # Move to trash if the image has width or height less than or equal to 150 pixels
    if [ "$width" -le 150 ] || [ "$height" -le 150 ]; then
        echo "Image $img is too small (width=$width, height=$height)."
        move_to_trash "$img"
        return
    fi

    # Skip if the image is already resized to appropriate dimensions
    if [ "$width" -eq 640 ] && [ "$height" -eq 640 ]; then
        echo "Skipping $img (already 640x640)."
        return
    elif [ "$width" -eq 640 ] && [ "$height" -gt "$width" ]; then
        echo "Skipping $img (portrait already resized)."
        return
    elif [ "$height" -eq 640 ] && [ "$width" -gt "$height" ]; then
        echo "Skipping $img (landscape already resized)."
        return
    fi

    # Scale based on the image orientation
    if [ "$height" -gt "$width" ]; then
        # Portrait: Set width to 640 and adjust height to keep aspect ratio
        echo "Resizing portrait $img to width of 640 pixels..."
        magick "$img" -resize 640x "$img"
    elif [ "$width" -gt "$height" ]; then
        # Landscape: Set height to 640 and adjust width to keep aspect ratio
        echo "Resizing landscape $img to height of 640 pixels..."
        magick "$img" -resize x640 "$img"
    else
        # Square: Resize to 640x640 pixels
        echo "Resizing square $img to 640x640 pixels..."
        magick "$img" -resize 640x640 "$img"
    fi
}

# Find all image files (png, jpg, jpeg) in the current directory and subdirectories
image_files=$(find . -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \))

# Count the total number of images
total_images=$(echo "$image_files" | wc -l)

# Initialize the counter for progress
counter=1

# Process each image file
echo "$image_files" | while read -r img; do
    resize_or_trash_image "$img" "$counter" "$total_images"
    counter=$((counter + 1))
done

echo "Processing complete!"
