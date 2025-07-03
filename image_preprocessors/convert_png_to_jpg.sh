#!/bin/bash

# Check if ImageMagick (magick command) is installed
if ! command -v magick &> /dev/null; then
    echo "ImageMagick is required but not installed. Please install ImageMagick first."
    exit 1
fi

# Function to convert a PNG image to JPG
convert_png_to_jpg() {
    img="$1"
    index="$2"
    total="$3"
    
    # Get the filename without extension
    filename="${img%.png}"
    
    # Convert the PNG to JPG using ImageMagick
    echo "[$index/$total] Converting $img to $filename.jpg..."
    magick convert "$img" "${filename}.jpg"
    
    # Optional: You can delete the original PNG file after conversion if needed
    # Uncomment the following line to enable it
    rm "$img"
}

# Find all PNG files in the current directory and subdirectories
png_files=$(find . -type f -iname "*.png")

# Count the total number of PNG files
total_files=$(echo "$png_files" | wc -l)

# Initialize the counter
counter=1

# Process each PNG file and show progress
echo "$png_files" | while read -r img; do
    convert_png_to_jpg "$img" "$counter" "$total_files"
    counter=$((counter + 1))
done

echo "Conversion complete!"
