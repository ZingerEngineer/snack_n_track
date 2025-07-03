#!/bin/bash

# Check dependencies
if ! command -v magick &> /dev/null; then
    echo "ImageMagick is required but not installed. Please install ImageMagick first."
    exit 1
fi

if ! command -v bc &> /dev/null; then
    echo "bc is required but not installed. Please install bc first."
    exit 1
fi

# Target count per split
declare -A split_targets=( ["train"]=350 ["test"]=75 ["val"]=75 )

# List of augmentation operations
operations=("flip_h" "rotate_cw" "rotate_ccw" "flip_v")

clean_label_file() {
    sed -i 's/\r//g' "$1"
}

augment_image_and_label() {
    img="$1"
    lbl="$2"
    operation="$3"
    aug_count="$4"
    output_img_dir="$5"
    output_lbl_dir="$6"

    img_filename=$(basename -- "$img")
    img_filename="${img_filename%.*}"
    lbl_filename=$(basename -- "$lbl")
    lbl_filename="${lbl_filename%.*}"

    case "$operation" in
        "rotate_cw")
            magick "$img" -rotate 90 "$output_img_dir/${img_filename}_rotated_cw_${aug_count}.jpg"
            out_label="$output_lbl_dir/${lbl_filename}_rotated_cw_${aug_count}.txt"
            ;;
        "rotate_ccw")
            magick "$img" -rotate -90 "$output_img_dir/${img_filename}_rotated_ccw_${aug_count}.jpg"
            out_label="$output_lbl_dir/${lbl_filename}_rotated_ccw_${aug_count}.txt"
            ;;
        "flip_h")
            magick "$img" -flop "$output_img_dir/${img_filename}_flipped_h_${aug_count}.jpg"
            out_label="$output_lbl_dir/${lbl_filename}_flipped_h_${aug_count}.txt"
            ;;
        "flip_v")
            magick "$img" -flip "$output_img_dir/${img_filename}_flipped_v_${aug_count}.jpg"
            out_label="$output_lbl_dir/${lbl_filename}_flipped_v_${aug_count}.txt"
            ;;
    esac

    > "$out_label"
    while IFS= read -r line || [[ -n "$line" ]]; do
        class_id=$(echo "$line" | awk '{print $1}')
        x_center=$(echo "$line" | awk '{print $2}')
        y_center=$(echo "$line" | awk '{print $3}')
        width=$(echo "$line" | awk '{print $4}')
        height=$(echo "$line" | awk '{print $5}')

        case "$operation" in
            "rotate_cw")
                new_x_center=$(echo "scale=6; 1 - $y_center" | bc)
                new_y_center=$(echo "$x_center" | bc)
                new_width="$height"
                new_height="$width"
                ;;
            "rotate_ccw")
                new_x_center=$(echo "$y_center" | bc)
                new_y_center=$(echo "scale=6; 1 - $x_center" | bc)
                new_width="$height"
                new_height="$width"
                ;;
            "flip_h")
                new_x_center=$(echo "scale=6; 1 - $x_center" | bc)
                new_y_center="$y_center"
                new_width="$width"
                new_height="$height"
                ;;
            "flip_v")
                new_x_center="$x_center"
                new_y_center=$(echo "scale=6; 1 - $y_center" | bc)
                new_width="$width"
                new_height="$height"
                ;;
        esac

        echo "$class_id $new_x_center $new_y_center $new_width $new_height" >> "$out_label"
    done < "$lbl"
}

# Get parent directory (where script is run)
parent_dir="$(pwd)"

# Loop through each dataset directory
for dataset_path in "$parent_dir"/*/; do
    dataset_name=$(basename "$dataset_path")

    echo ""
    echo "🔍 Processing dataset: $dataset_name"

    for split in train test val; do
        img_dir="$dataset_path/$split/images"
        lbl_dir="$dataset_path/$split/labels"

        if [ ! -d "$img_dir" ] || [ ! -d "$lbl_dir" ]; then
            echo "❌ Skipping $dataset_name/$split: Missing images or labels directory."
            continue
        fi

        echo "➡️ Split: $split"

        images=("$img_dir"/*.jpg)
        current_count=${#images[@]}
        target_count=${split_targets[$split]}
        echo "   Current: $current_count / Target: $target_count"

        if [ "$current_count" -ge "$target_count" ]; then
            echo "   ✅ Already sufficient images. Skipping augmentation."
            continue
        fi

        augment_needed=$((target_count - current_count))
        aug_count=$((current_count + 1))

        operation_index=0
        while [ "$current_count" -lt "$target_count" ]; do
            for img in "${images[@]}"; do
                lbl="$lbl_dir/$(basename "$img" .jpg).txt"

                if [[ ! -f "$lbl" ]]; then
                    echo "   ⚠️  Skipping: Label not found for $img"
                    continue
                fi

                clean_label_file "$lbl"

                operation="${operations[$operation_index]}"
                augment_image_and_label "$img" "$lbl" "$operation" "$aug_count" "$img_dir" "$lbl_dir"

                current_count=$((current_count + 1))
                aug_count=$((aug_count + 1))

                if [ "$current_count" -ge "$target_count" ]; then
                    break
                fi
            done

            operation_index=$(( (operation_index + 1) % ${#operations[@]} ))
        done

        echo "   ✅ Augmented to $current_count images."
    done
done

echo ""
echo "🎉 All datasets processed successfully!"
#!/bin/bash

# Check dependencies
if ! command -v magick &> /dev/null; then
    echo "ImageMagick is required but not installed. Please install ImageMagick first."
    exit 1
fi

if ! command -v bc &> /dev/null; then
    echo "bc is required but not installed. Please install bc first."
    exit 1
fi

# Target count per split
declare -A split_targets=( ["train"]=350 ["test"]=75 ["val"]=75 )

# List of augmentation operations
operations=("flip_h" "rotate_cw" "rotate_ccw" "flip_v")

clean_label_file() {
    sed -i 's/\r//g' "$1"
}

augment_image_and_label() {
    img="$1"
    lbl="$2"
    operation="$3"
    aug_count="$4"
    output_img_dir="$5"
    output_lbl_dir="$6"

    img_filename=$(basename -- "$img")
    img_filename="${img_filename%.*}"
    lbl_filename=$(basename -- "$lbl")
    lbl_filename="${lbl_filename%.*}"

    case "$operation" in
        "rotate_cw")
            magick "$img" -rotate 90 "$output_img_dir/${img_filename}_rotated_cw_${aug_count}.jpg"
            out_label="$output_lbl_dir/${lbl_filename}_rotated_cw_${aug_count}.txt"
            ;;
        "rotate_ccw")
            magick "$img" -rotate -90 "$output_img_dir/${img_filename}_rotated_ccw_${aug_count}.jpg"
            out_label="$output_lbl_dir/${lbl_filename}_rotated_ccw_${aug_count}.txt"
            ;;
        "flip_h")
            magick "$img" -flop "$output_img_dir/${img_filename}_flipped_h_${aug_count}.jpg"
            out_label="$output_lbl_dir/${lbl_filename}_flipped_h_${aug_count}.txt"
            ;;
        "flip_v")
            magick "$img" -flip "$output_img_dir/${img_filename}_flipped_v_${aug_count}.jpg"
            out_label="$output_lbl_dir/${lbl_filename}_flipped_v_${aug_count}.txt"
            ;;
    esac

    > "$out_label"
    while IFS= read -r line || [[ -n "$line" ]]; do
        class_id=$(echo "$line" | awk '{print $1}')
        x_center=$(echo "$line" | awk '{print $2}')
        y_center=$(echo "$line" | awk '{print $3}')
        width=$(echo "$line" | awk '{print $4}')
        height=$(echo "$line" | awk '{print $5}')

        case "$operation" in
            "rotate_cw")
                new_x_center=$(echo "scale=6; 1 - $y_center" | bc)
                new_y_center=$(echo "$x_center" | bc)
                new_width="$height"
                new_height="$width"
                ;;
            "rotate_ccw")
                new_x_center=$(echo "$y_center" | bc)
                new_y_center=$(echo "scale=6; 1 - $x_center" | bc)
                new_width="$height"
                new_height="$width"
                ;;
            "flip_h")
                new_x_center=$(echo "scale=6; 1 - $x_center" | bc)
                new_y_center="$y_center"
                new_width="$width"
                new_height="$height"
                ;;
            "flip_v")
                new_x_center="$x_center"
                new_y_center=$(echo "scale=6; 1 - $y_center" | bc)
                new_width="$width"
                new_height="$height"
                ;;
        esac

        echo "$class_id $new_x_center $new_y_center $new_width $new_height" >> "$out_label"
    done < "$lbl"
}

# Get parent directory (where script is run)
parent_dir="$(pwd)"

# Loop through each dataset directory
for dataset_path in "$parent_dir"/*/; do
    dataset_name=$(basename "$dataset_path")

    echo ""
    echo "🔍 Processing dataset: $dataset_name"

    for split in train test val; do
        img_dir="$dataset_path/$split/images"
        lbl_dir="$dataset_path/$split/labels"

        if [ ! -d "$img_dir" ] || [ ! -d "$lbl_dir" ]; then
            echo "❌ Skipping $dataset_name/$split: Missing images or labels directory."
            continue
        fi

        echo "➡️ Split: $split"

        images=("$img_dir"/*.jpg)
        current_count=${#images[@]}
        target_count=${split_targets[$split]}
        echo "   Current: $current_count / Target: $target_count"

        if [ "$current_count" -ge "$target_count" ]; then
            echo "   ✅ Already sufficient images. Skipping augmentation."
            continue
        fi

        augment_needed=$((target_count - current_count))
        aug_count=$((current_count + 1))

        operation_index=0
        while [ "$current_count" -lt "$target_count" ]; do
            for img in "${images[@]}"; do
                lbl="$lbl_dir/$(basename "$img" .jpg).txt"

                if [[ ! -f "$lbl" ]]; then
                    echo "   ⚠️  Skipping: Label not found for $img"
                    continue
                fi

                clean_label_file "$lbl"

                operation="${operations[$operation_index]}"
                augment_image_and_label "$img" "$lbl" "$operation" "$aug_count" "$img_dir" "$lbl_dir"

                current_count=$((current_count + 1))
                aug_count=$((aug_count + 1))

                if [ "$current_count" -ge "$target_count" ]; then
                    break
                fi
            done

            operation_index=$(( (operation_index + 1) % ${#operations[@]} ))
        done

        echo "   ✅ Augmented to $current_count images."
    done
done

echo ""
echo "🎉 All datasets processed successfully!"
