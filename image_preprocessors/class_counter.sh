#!/bin/bash

# Set the parent directory to the current working directory
parent_dir="$(pwd)"

# Iterate through every dataset directory in the parent directory
for dataset_dir in "$parent_dir"/*/; do

    # Check if the dataset contains any '.txt' files
    txt_files=$(find "$dataset_dir" -type f -name "*.txt")
    if [ -z "$txt_files" ]; then
        echo "Skipping '$dataset_dir': No '.txt' files found."
        continue
    fi

    echo "Processing dataset in '$dataset_dir'..."

    declare -A class_count

    # Loop through each label file (any .txt file found in the directory)
    while IFS= read -r lbl_file; do
        while IFS= read -r line || [[ -n "$line" ]]; do
            # Extract the class ID (first element in each line)
            class_id=$(echo "$line" | awk '{print $1}')
            
            # Increment the count for this class ID
            if [[ -n "$class_id" ]]; then
                class_count["$class_id"]=$((class_count["$class_id"] + 1))
            fi
        done < "$lbl_file"
    done <<< "$txt_files"

    echo "Class counts for dataset '$dataset_dir':"
    
    # Sort class IDs numerically and display the counts
    for class_id in $(echo "${!class_count[@]}" | tr ' ' '\n' | sort -n); do
        echo "Class ID $class_id: ${class_count[$class_id]} occurrences"
    done

    echo "----------------------------------------"

done

echo "All datasets in '$parent_dir' have been processed!"
