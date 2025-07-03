#!/bin/bash

# Check if the correct number of arguments are provided
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <train_percentage> <val_percentage> <test_percentage>"
    exit 1
fi

# Parse arguments
train_percentage="$1"
val_percentage="$2"
test_percentage="$3"

# Calculate total percentage to make sure it sums to 100
total_percentage=$((train_percentage + val_percentage + test_percentage))
if [ "$total_percentage" -ne 100 ]; then
    echo "Error: Train, validation, and test percentages must sum to 100."
    exit 1
fi

# Set the parent directory to the current directory (the one the script is run from)
parent_dir="$(pwd)"

# Iterate through every dataset in the current directory
for dataset_dir in "$parent_dir"/*/; do

    # Ensure each dataset has the necessary 'images/' and 'labels/' directories
    if [ ! -d "$dataset_dir/images" ] || [ ! -d "$dataset_dir/labels" ]; then
        echo "Skipping '$dataset_dir': 'images/' or 'labels/' directory not found."
        continue
    fi

    # Create directories for train, val, and test datasets within each dataset directory
    mkdir -p "$dataset_dir"/train/images "$dataset_dir"/train/labels
    mkdir -p "$dataset_dir"/val/images "$dataset_dir"/val/labels
    mkdir -p "$dataset_dir"/test/images "$dataset_dir"/test/labels

    # Find all image files in the dataset directory (assuming images end with .jpg or .png)
    images=($(find "$dataset_dir/images" -type f \( -iname "*.jpg" -o -iname "*.png" \)))

    # Get the number of images
    total_images=${#images[@]}

    if [ "$total_images" -eq 0 ]; then
        echo "No images found in '$dataset_dir/images/'. Skipping..."
        continue
    fi

    # Calculate number of images for each split
    train_count=$(echo "$total_images * $train_percentage / 100" | bc)
    val_count=$(echo "$total_images * $val_percentage / 100" | bc)
    test_count=$(echo "$total_images * $test_percentage / 100" | bc)

    echo "Processing dataset in '$dataset_dir'..."
    echo "Total images: $total_images"
    echo "Train count: $train_count"
    echo "Validation count: $val_count"
    echo "Test count: $test_count"

    # Shuffle the images array
    shuffled_images=($(shuf -e "${images[@]}"))

    # Function to copy images and corresponding label files
    copy_files() {
        subset=("${!1}")
        dest_dir="$2"
        
        for image_path in "${subset[@]}"; do
            # Copy image
            cp "$image_path" "$dest_dir/images/"
            
            # Copy corresponding label (replace the extension .jpg/.png with .txt for labels)
            label_path="${image_path/images/labels}"      # Replace folder 'images' with 'labels'
            label_path="${label_path%.*}.txt"             # Change file extension to .txt
            if [ -f "$label_path" ]; then
                cp "$label_path" "$dest_dir/labels/"
            else
                echo "Warning: No label file found for image $image_path, skipping label copy."
            fi
        done
    }

    # Split the dataset into train, validation, and test sets
    train_images=("${shuffled_images[@]:0:train_count}")
    val_images=("${shuffled_images[@]:train_count:val_count}")
    test_images=("${shuffled_images[@]:train_count+val_count:test_count}")

    # Show progress
    total_files=$((train_count + val_count + test_count))
    echo "Splitting dataset into train, validation, and test sets for '$dataset_dir'..."
    progress=0

    # Copy files to train, val, and test directories
    echo "Copying train images and labels..."
    copy_files train_images[@] "$dataset_dir/train"
    progress=$((progress + train_count))
    echo "[$progress/$total_files] Train images and labels copied."

    echo "Copying validation images and labels..."
    copy_files val_images[@] "$dataset_dir/val"
    progress=$((progress + val_count))
    echo "[$progress/$total_files] Validation images and labels copied."

    echo "Copying test images and labels..."
    copy_files test_images[@] "$dataset_dir/test"
    progress=$((progress + test_count))
    echo "[$progress/$total_files] Test images and labels copied."

    echo "Dataset splitting complete for '$dataset_dir'!"

done

echo "All datasets in '$parent_dir' have been processed!"
