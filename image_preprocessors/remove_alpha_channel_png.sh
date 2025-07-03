#!/bin/bash

# Check if ImageMagick (magick command) is installed
if ! command -v magick &> /dev/null; then
    echo "ImageMagick is required but not installed. Please install ImageMagick first."
    exit 1
fi

# Function to remove alpha channel and replace transparency with black
remove_alpha_channel() {
    img="$1"
    index="$2"
    total="$3"

    # Remove the alpha channel and set transparent pixels to black, replacing the original image
    echo "Processing image $index of $total: Removing alpha channel from $img, setting transparent pixels to black..."
    magick "$img" -background black -alpha remove -alpha off "$img"
}

# Find all PNG, JPG, and JPEG files in the current directory and subdirectories
image_files=$(find . -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \))

# Count the total number of images
total_images=$(echo "$image_files" | wc -l)

# Check if no images were found
if [ "$total_images" -eq 0 ]; then
    echo "No PNG, JPG, or JPEG images found."
    exit 0
fi

# Initialize the counter for progress
counter=1

# Process each image file
echo "$image_files" | while read -r img; do
    remove_alpha_channel "$img" "$counter" "$total_images"
    counter=$((counter + 1))
done

echo "Alpha channel removal complete!"

