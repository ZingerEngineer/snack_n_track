#!/bin/bash

# Check if ImageMagick (magick command) is installed
if ! command -v magick &> /dev/null; then
    echo "ImageMagick is required but not installed. Please install ImageMagick first."
    exit 1
fi

# Function to convert an image to PNG
convert_to_png() {
    img="$1"
    extension="${img##*.}"
    index="$2"
    total="$3"
    
    # Skip if the image is already in PNG format
    if [[ "$extension" == "png" || "$extension" == "PNG" ]]; then
        echo "[$index/$total] Skipping $img (already a PNG)."
        return
    fi

    # Get the filename without extension
    filename="${img%.*}"
    
    # Convert the image to PNG using ImageMagick (with 'magick' command)
    echo "[$index/$total] Converting $img to $filename.png..."
    magick "$img" "${filename}.png"
    
    # Optional: You can delete the original image after conversion if needed
    # Uncomment the following line to enable it
    rm "$img"
}

# Find all image files (excluding PNGs) in the current directory and subdirectories
images=$(find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.bmp" -o -iname "*.gif" -o -iname "*.tiff" \))

# Count the total number of image files
total_files=$(echo "$images" | wc -l)

# Initialize the counter
counter=1

# Process each image and show progress
echo "$images" | while read -r img; do
    convert_to_png "$img" "$counter" "$total_files"
    counter=$((counter + 1))
done

echo "Conversion complete!"
