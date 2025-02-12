#!/bin/bash

echo "Starting VNC and X server setup..."
./run_vnc.sh

# Wait for services to start
sleep 3

# Set default display
export DISPLAY=:1

# Set default screen resolution
export WIDTH=1024
export HEIGHT=768

# Ensure python virtual environment
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

echo
echo "Computer Use Agent Terminal Interface"
echo "----------------------------------"
echo
echo "Ready for input. Type 'exit' to quit."
echo "Type 'help' for available commands."
echo

# Run the computer agent
computer-agent