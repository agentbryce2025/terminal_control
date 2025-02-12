#!/bin/bash

OS="$(uname -s)"

function open_url() {
    local url="$1"
    if [ "${OS}" = "Darwin" ]; then
        # For macOS, use AppleScript to control Firefox
        osascript <<EOF
            tell application "Firefox"
                activate
                delay 1
                open location "$url"
            end tell
EOF
    else
        # For Linux, use the original method
        DISPLAY=:1 firefox "$url"
    fi
}

function type_text() {
    local text="$1"
    if [ "${OS}" = "Darwin" ]; then
        # For macOS, use AppleScript to type text
        osascript <<EOF
            tell application "System Events"
                keystroke "$text"
            end tell
EOF
    else
        # For Linux, use xdotool
        DISPLAY=:1 xdotool type "$text"
    fi
}

function press_key() {
    local key="$1"
    if [ "${OS}" = "Darwin" ]; then
        # For macOS, use AppleScript to press keys
        osascript <<EOF
            tell application "System Events"
                key code $key
            end tell
EOF
    else
        # For Linux, use xdotool
        DISPLAY=:1 xdotool key "$key"
    fi
}

if [ "${OS}" = "Darwin" ]; then
    # On macOS, we'll use direct browser control
    echo "Setting up macOS environment..."
    
    # Set screen resolution
    export WIDTH=1024
    export HEIGHT=768
    
    # Export the helper functions
    export -f open_url
    export -f type_text
    export -f press_key
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