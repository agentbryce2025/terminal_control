#!/bin/bash

# Function to check if XQuartz is running
check_xquartz() {
    if [ "$(uname)" == "Darwin" ]; then
        if ! ps aux | grep -v grep | grep -q XQuartz; then
            echo "XQuartz is not running. Starting XQuartz..."
            open -a XQuartz
            # Wait for XQuartz to start
            sleep 5
        fi
    fi
}

# Set up display for different operating systems
if [ "$(uname)" == "Darwin" ]; then
    check_xquartz
    export DISPLAY=:0
else
    # Default for Linux
    export DISPLAY=:1
fi

# Set default screen resolution if not set
if [ -z "$WIDTH" ]; then
    export WIDTH=1024
fi
if [ -z "$HEIGHT" ]; then
    export HEIGHT=768
fi

# Check for virtual environment
if [ ! -d ".venv" ]; then
    echo "Virtual environment not found. Running setup script..."
    ./setup.sh
fi

# Activate virtual environment
source .venv/bin/activate

# Verify computer-agent is installed
if ! command -v computer-agent &> /dev/null; then
    echo "computer-agent not found. Installing package..."
    pip install -e .
fi

# Run the computer agent
computer-agent