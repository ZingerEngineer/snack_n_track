#!/bin/bash

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null || ! command -v identify &> /dev/null
then
    echo "ImageMagick is required but not installed. Please install ImageMagick first."
    exit 1
fi

# Loop over each PNG file in the current directory
for img in *.png; do
    # Get the image dimensions (width and height)
    dimensions=$(identify -format "%w %h" "$img")
    width=$(echo $dimensions | cut -d' ' -f1)
    height=$(echo $dimensions | cut -d' ' -f2)

    # Calculate the difference between width and height
    if [ "$width" -gt "$height" ]; then
        diff=$(( (width - height) / 2 ))
        crop_width=$height
        crop_height=$height
        offset_x=$diff
        offset_y=0
    elif [ "$height" -gt "$width" ]; then
        diff=$(( (height - width) / 2 ))
        crop_width=$width
        crop_height=$width
        offset_x=0
        offset_y=$diff
    else
        # Image is already a square, no need to crop
        echo "$img is already a square, skipping."
        continue
    fi

    # Crop the image to a square, keeping the center
    echo "Cropping $img to a square..."
    convert "$img" -crop "${crop_width}x${crop_height}+${offset_x}+${offset_y}" +repage "$img"

done

echo "Cropping complete!"
