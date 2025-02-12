#!/bin/bash

OS="$(uname -s)"

# Ensure python virtual environment
if [ ! -d ".venv" ]; then
    echo "Virtual environment not found. Running setup script..."
    ./setup.sh
fi

# Activate virtual environment
source .venv/bin/activate

# Verify computer-agent is installed
if ! python3 -c "import computer_use_demo" &> /dev/null; then
    echo "computer_use_demo not found. Installing package..."
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