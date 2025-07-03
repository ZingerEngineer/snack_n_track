#!/bin/bash

# Set the current working directory (run directory)
run_dir=$(pwd)

# Set the source directories for images and labels relative to the run directory
images_dir="${run_dir}/images"
labels_dir="${run_dir}/labels"

# Set the target directories for copied images and labels relative to the run directory
target_images_dir="${run_dir}/target_images"
target_labels_dir="${run_dir}/target_labels"

# Create target directories if they don't exist
mkdir -p "$target_images_dir"
mkdir -p "$target_labels_dir"

# Find all images in the source directory (assumes image format is .jpg)
images=($(find "$images_dir" -type f -name "*.jpg"))

# Total number of images available
total_images=${#images[@]}

# Number of images to copy
num_to_copy=1000

# Check if enough images exist in the source directory
if (( total_images < num_to_copy )); then
    echo "Not enough images in the dataset. Found only $total_images images."
    exit 1
fi

# Create an associative array to track copied files and avoid duplicates
declare -A copied_files

# Function to get the corresponding label for an image
get_label_for_image() {
    image_file="$1"
    image_filename=$(basename "$image_file" .jpg)  # Get the image filename without extension
    label_file="$labels_dir/$image_filename.txt"   # Corresponding label file
    echo "$label_file"
}

# Copy files randomly until the target count (1000) is reached
while (( ${#copied_files[@]} < num_to_copy )); do
    # Pick a random index from the images array
    random_index=$((RANDOM % total_images))
    image_file="${images[$random_index]}"
    
    # Get the corresponding label file for the image
    label_file=$(get_label_for_image "$image_file")
    
    # Check if the label exists and if the image hasn't been copied yet
    if [[ -f "$label_file" && -z "${copied_files[$image_file]}" ]]; then
        # Copy the image and the corresponding label to the target directory
        cp "$image_file" "$target_images_dir/"
        cp "$label_file" "$target_labels_dir/"
        
        # Mark the image as copied to avoid duplicates
        copied_files["$image_file"]=1

        # Output progress
        echo "Copied image and label: $(basename "$image_file")"
    fi
done

echo "Successfully copied $num_to_copy images and labels to $target_images_dir and $target_labels_dir."
