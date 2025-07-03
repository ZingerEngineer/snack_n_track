#!/bin/bash

# FastAPI Meal Classification Service Startup Script

echo "Starting Meal Classification API..."

# Check if pyenv is installed
if command -v pyenv >/dev/null 2>&1; then
    # pyenv is installed
    VENV_NAME="snack_model_env"
    VENV_PATH="$HOME/.pyenv/versions/$VENV_NAME"
    if [ -d "$VENV_PATH" ]; then
        VENV_PYTHON_VERSION=$("$VENV_PATH/bin/python" --version 2>&1)
        if [[ "$VENV_PYTHON_VERSION" == "Python 3.12.0" ]]; then
            echo "Found $VENV_NAME with Python 3.12.0"
        else
            echo "$VENV_NAME exists but is not Python 3.12.0. Recreating..."
            pyenv uninstall -f "$VENV_NAME"
            pyenv virtualenv 3.12.0 "$VENV_NAME"
        fi
    else
        echo "Creating virtual environment $VENV_NAME with Python 3.12.0..."
        pyenv virtualenv 3.12.0 "$VENV_NAME"
    fi
    ln -sfn "$VENV_PATH" venv
else
    # pyenv is not installed, use python venv
    if [ ! -d "venv" ]; then
        echo "pyenv not found. Creating virtual environment using system python..."
        python3 -m venv venv
    fi
fi

# Activate virtual environment only if pyenv is not installed
if ! command -v pyenv >/dev/null 2>&1; then
    source venv/bin/activate
fi

# Install dependencies only if pyenv with "snack_model_venv" and Python 3.12.0 was not found
if ! (command -v pyenv >/dev/null 2>&1 && [ -d "$VENV_PATH" ] && [[ "$VENV_PYTHON_VERSION" == "Python 3.12.0" ]]); then
    echo "Installing dependencies..."
    pip install --upgrade pip
    pip install -r requirements.txt
fi

# Check if model file exists
if [ ! -f "best.pt" ]; then
    echo "Warning: Model file 'best.pt' not found!"
    echo "Please ensure the YOLO model file is present before starting the service."
    exit 1
fi

# Create downloads directory if it doesn't exist
mkdir -p downloads

# Start the FastAPI server
echo "Starting FastAPI server on http://localhost:8000"

uvicorn main:app --host 0.0.0.0 --port 8000 --reload
