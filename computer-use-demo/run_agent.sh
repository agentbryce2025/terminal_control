#!/bin/bash

OS="$(uname -s)"

if [ "${OS}" = "Darwin" ]; then
    # On macOS, we don't need X11/VNC setup
    echo "Setting up macOS environment..."
    
    # Set screen resolution
    export WIDTH=1024
    export HEIGHT=768
    
    # Request accessibility permissions if needed
    echo "Checking accessibility permissions..."
    osascript -e 'tell application "System Events" to get name of first process whose frontmost is true' &>/dev/null || {
        echo "Please grant accessibility permissions to Terminal in System Preferences > Security & Privacy > Privacy > Accessibility"
        open "x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility"
        read -p "Press Enter after granting permissions..."
    }
else
    # For Linux, use the original X11/VNC setup
    echo "Starting VNC and X server setup..."
    ./run_vnc.sh
    
    # Wait for services to start
    sleep 3
    
    # Set default display
    export DISPLAY=:1
fi

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