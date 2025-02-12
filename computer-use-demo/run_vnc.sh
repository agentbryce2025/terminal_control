#!/bin/bash

OS="$(uname -s)"

if [ "${OS}" = "Darwin" ]; then
    # Check if XQuartz is running
    if ! ps aux | grep -v grep | grep -q XQuartz; then
        echo "Starting XQuartz..."
        open -a XQuartz
        sleep 3  # Wait for XQuartz to start
    fi

    # Ensure ~/.vnc directory exists
    mkdir -p ~/.vnc

    # Create a minimal VNC config if it doesn't exist
    if [ ! -f ~/.vnc/config ]; then
        cat > ~/.vnc/config << EOF
geometry=1024x768
localhost
EOF
    fi

    # Kill any existing VNC servers
    pkill -f "Xvnc :1" || true
    
    # Start VNC server using full path
    if command -v /opt/homebrew/bin/vncserver &> /dev/null; then
        VNCSERVER="/opt/homebrew/bin/vncserver"
    elif command -v /usr/local/bin/vncserver &> /dev/null; then
        VNCSERVER="/usr/local/bin/vncserver"
    else
        echo "vncserver not found. Please ensure tiger-vnc is installed:"
        echo "brew install tiger-vnc"
        exit 1
    fi

    # Start VNC server
    $VNCSERVER :1 -geometry 1024x768 -localhost
    
    # Wait for VNC server to start
    sleep 2
    
    # Set DISPLAY variable
    export DISPLAY=:1
    
    # Test X11 connection
    if ! xset q &>/dev/null; then
        echo "Warning: Could not connect to X server"
        # Try alternative DISPLAY setting
        export DISPLAY=:0
        if ! xset q &>/dev/null; then
            echo "Warning: Could not connect to X server on :0 either"
        fi
    fi
else
    # Linux setup
    Xvfb :1 -screen 0 1024x768x24 &
    sleep 2
    DISPLAY=:1 mutter --replace &
    sleep 2
    DISPLAY=:1 tint2 &
fi