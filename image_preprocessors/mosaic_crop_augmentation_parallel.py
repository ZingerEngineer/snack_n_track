import os
import random
import cv2
import numpy as np
from concurrent.futures import ProcessPoolExecutor

def read_labels(label_file):
    """
    Read YOLO labels from a file.
    Each line: class_id x_center y_center width height (normalized).
    Returns a list of tuples (class_id, x, y, w, h), with class_id as int.
    """
    labels = []
    with open(label_file, 'r') as f:
        for line in f:
            parts = line.strip().split()
            if len(parts) >= 5:
                class_id, x, y, w, h = parts[:5]
                labels.append((int(class_id), float(x), float(y), float(w), float(h)))
    return labels

def write_labels(labels, label_file):
    """Write YOLO labels to a file."""
    with open(label_file, 'w') as f:
        for label in labels:
            f.write(f"{int(label[0])} {label[1]:.6f} {label[2]:.6f} {label[3]:.6f} {label[4]:.6f}\n")

def random_crop_and_resize(image, target_size=320, scale_range=(0.5, 1.0)):
    """
    Randomly crop a square region from the image and then resize to target_size.
    Returns the cropped & resized image along with crop parameters:
      (crop_x, crop_y, crop_size, orig_w, orig_h)
    """
    orig_h, orig_w = image.shape[:2]
    max_square = min(orig_w, orig_h)
    scale = random.uniform(scale_range[0], scale_range[1])
    crop_size = int(scale * max_square)
    crop_x = random.randint(0, orig_w - crop_size) if orig_w - crop_size > 0 else 0
    crop_y = random.randint(0, orig_h - crop_size) if orig_h - crop_size > 0 else 0
    cropped = image[crop_y:crop_y+crop_size, crop_x:crop_x+crop_size]
    resized = cv2.resize(cropped, (target_size, target_size))
    return resized, (crop_x, crop_y, crop_size, orig_w, orig_h)

def adjust_labels_for_crop(labels, crop_params):
    """
    Adjust YOLO labels from the original image to the cropped image coordinate system.
    crop_params = (crop_x, crop_y, crop_size, orig_w, orig_h)
    The function converts normalized center-format boxes to absolute corner coordinates,
    clips the boxes to the crop boundaries, and then converts them back to normalized center format.
    Boxes that fall completely outside the crop are dropped.
    """
    crop_x, crop_y, crop_size, orig_w, orig_h = crop_params
    adjusted = []
    for label in labels:
        class_id, x, y, w, h = label
        # Convert normalized center format to absolute corner coordinates
        abs_x_center = x * orig_w
        abs_y_center = y * orig_h
        abs_w = w * orig_w
        abs_h = h * orig_h
        x1 = abs_x_center - abs_w/2
        y1 = abs_y_center - abs_h/2
        x2 = abs_x_center + abs_w/2
        y2 = abs_y_center + abs_h/2

        # Adjust coordinates relative to crop origin
        new_x1 = x1 - crop_x
        new_y1 = y1 - crop_y
        new_x2 = x2 - crop_x
        new_y2 = y2 - crop_y

        # Clip coordinates to the crop region [0, crop_size]
        new_x1 = max(0, new_x1)
        new_y1 = max(0, new_y1)
        new_x2 = min(crop_size, new_x2)
        new_y2 = min(crop_size, new_y2)

        # If box is completely outside, skip it
        if new_x1 >= new_x2 or new_y1 >= new_y2:
            continue

        # Convert back to center format and normalize to crop_size
        new_w = new_x2 - new_x1
        new_h = new_y2 - new_y1
        new_x_center = new_x1 + new_w/2
        new_y_center = new_y1 + new_h/2

        norm_x = new_x_center / crop_size
        norm_y = new_y_center / crop_size
        norm_w = new_w / crop_size
        norm_h = new_h / crop_size

        adjusted.append((class_id, norm_x, norm_y, norm_w, norm_h))
    return adjusted

def adjust_label_for_mosaic(label, offset_x, offset_y):
    """
    Given a label from a forced square image (320x320), adjust it for mosaic placement.
    The mosaic is 2x2, so we simply divide each coordinate by 2 and add an offset (0 or 0.5).
    """
    class_id, x, y, w, h = label
    new_x = x / 2 + offset_x
    new_y = y / 2 + offset_y
    new_w = w / 2
    new_h = h / 2
    return (class_id, new_x, new_y, new_w, new_h)

def create_mosaic(img_files, label_files, output_img, output_lbl, target_size=320):
    """
    Create a mosaic from 4 images.
    For each image:
      - Load the image.
      - Randomly crop a square region and resize to target_size x target_size.
      - Adjust labels accordingly for the crop.
    Then, stitch the 4 resized images into a 2x2 mosaic and adjust the labels for mosaic placement.
    """
    cropped_imgs = []
    cropped_labels = []
    for i in range(4):
        img = cv2.imread(img_files[i])
        if img is None:
            raise ValueError(f"Cannot load image: {img_files[i]}")
        resized, crop_params = random_crop_and_resize(img, target_size=target_size)
        cropped_imgs.append(resized)
        labels = read_labels(label_files[i])
        adj_labels = adjust_labels_for_crop(labels, crop_params)
        cropped_labels.append(adj_labels)
    
    top_row = np.hstack((cropped_imgs[0], cropped_imgs[1]))
    bottom_row = np.hstack((cropped_imgs[2], cropped_imgs[3]))
    mosaic = np.vstack((top_row, bottom_row))
    cv2.imwrite(output_img, mosaic)
    print(f"Created mosaic image: {output_img}")

    offsets = [(0, 0), (0.5, 0), (0, 0.5), (0.5, 0.5)]
    mosaic_labels = []
    for i in range(4):
        for label in cropped_labels[i]:
            new_label = adjust_label_for_mosaic(label, offsets[i][0], offsets[i][1])
            mosaic_labels.append(new_label)
    write_labels(mosaic_labels, output_lbl)
    print(f"Created mosaic label file: {output_lbl}")

def mosaic_iteration(iteration, valid_images, valid_labels, total_images, output_img_dir, output_lbl_dir):
    indices = list(range(total_images))
    random.shuffle(indices)
    for i in range(0, total_images - 3, 4):
        img_files = [valid_images[indices[i+j]] for j in range(4)]
        lbl_files = [valid_labels[indices[i+j]] for j in range(4)]
        out_img = os.path.join(output_img_dir, f"mosaic_{iteration}_{i}.jpg")
        out_lbl = os.path.join(output_lbl_dir, f"mosaic_{iteration}_{i}.txt")
        create_mosaic(img_files, lbl_files, out_img, out_lbl)

def mosaic_augmentation_parallel(dataset_dir, output_img_dir, output_lbl_dir, iterations=4):
    train_images_dir = os.path.join(dataset_dir, "train", "images")
    train_labels_dir = os.path.join(dataset_dir, "train", "labels")
    if not os.path.isdir(train_images_dir) or not os.path.isdir(train_labels_dir):
        print("Training set directories not found. Please check your dataset.")
        return
    os.makedirs(output_img_dir, exist_ok=True)
    os.makedirs(output_lbl_dir, exist_ok=True)
    
    valid_images = []
    valid_labels = []
    for f in os.listdir(train_images_dir):
        if f.lower().endswith(".jpg"):
            img_path = os.path.join(train_images_dir, f)
            lbl_path = os.path.join(train_labels_dir, f.replace(".jpg", ".txt"))
            if os.path.exists(lbl_path):
                valid_images.append(img_path)
                valid_labels.append(lbl_path)
            else:
                print(f"Warning: No label for {img_path}, skipping.")
    total_images = len(valid_images)
    if total_images < 4:
        print("Not enough images for mosaic augmentation (need at least 4).")
        return

    from concurrent.futures import ProcessPoolExecutor
    with ProcessPoolExecutor() as executor:
        futures = []
        for iteration in range(1, iterations + 1):
            futures.append(executor.submit(mosaic_iteration, iteration, valid_images, valid_labels,
                                             total_images, output_img_dir, output_lbl_dir))
        for future in futures:
            future.result()
    print("Mosaic augmentation complete.")

if __name__ == "__main__":
    dataset_directory = os.getcwd()  # Use current directory as dataset directory.
    output_images_directory = os.path.join(dataset_directory, "train", "augmented_images")
    output_labels_directory = os.path.join(dataset_directory, "train", "augmented_labels")
    mosaic_augmentation_parallel(dataset_directory, output_images_directory, output_labels_directory, iterations=4)
