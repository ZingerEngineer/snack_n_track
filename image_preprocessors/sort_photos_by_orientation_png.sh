#!/bin/bash

# Check if ImageMagick is installed
if ! command -v identify &> /dev/null
then
    echo "ImageMagick is required but not installed. Please install ImageMagick first."
    exit 1
fi

# Create directories if they don't exist
mkdir -p portrait
mkdir -p landscape

# Loop over each PNG file in the current directory
for img in *.png; do
    # Get the image dimensions (width and height)
    dimensions=$(identify -format "%w %h" "$img")
    width=$(echo $dimensions | cut -d' ' -f1)
    height=$(echo $dimensions | cut -d' ' -f2)

    # Determine if the image is portrait or landscape
    if [ "$height" -gt "$width" ]; then
        echo "Moving $img to portrait folder..."
        mv "$img" portrait/
    elif [ "$width" -gt "$height" ]; then
        echo "Moving $img to landscape folder..."
        mv "$img" landscape/
    else
        echo "$img is a square, skipping."
    fi
done

echo "Sorting complete!"
