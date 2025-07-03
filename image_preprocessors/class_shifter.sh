#!/bin/bash

# Set the shift value
shift_value=101

# Find all txt files in the current directory and subdirectories
txt_files=$(find . -type f -name "*.txt")

# Count the total number of txt files
total_files=$(echo "$txt_files" | wc -l)

# Create a backup folder for the original labels
mkdir -p backup_labels

# Backup the original files
for label_file in $txt_files; do
    cp "$label_file" backup_labels/
done

# Initialize progress counter
counter=1

# Loop through all found txt files
for label_file in $txt_files; do
    echo "Processing [$counter/$total_files]: $label_file..."
    
    # Create a temporary file to store shifted data
    tmp_file=$(mktemp)
    
    # Use a while loop with `IFS= read -r` to ensure the last line is not skipped
    while IFS= read -r line || [[ -n "$line" ]]; do
        # Extract the class ID (first column) and the rest of the YOLO format (x_center, y_center, width, height)
        class_id=$(echo "$line" | awk '{print $1}')
        rest_of_line=$(echo "$line" | awk '{print $2, $3, $4, $5}')
        
        # Shift the class ID by the specified value
        new_class_id=$((class_id + shift_value))
        
        # Write the new class ID along with the rest of the annotation to the temporary file
        echo "$new_class_id $rest_of_line" >> "$tmp_file"
    done < "$label_file"
    
    # Replace the original label file with the modified version
    mv "$tmp_file" "$label_file"
    
    echo "Class IDs shifted in $label_file."
    
    # Increment the counter for progress
    counter=$((counter + 1))
done

echo "All classes in the label files have been shifted by $shift_value."
