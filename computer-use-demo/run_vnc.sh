#!/bin/bash

OS="$(uname -s)"

if [ "${OS}" = "Darwin" ]; then
    # Check if X11 is running
    if ! ps aux | grep -v grep | grep -q XQuartz; then
        echo "Starting XQuartz..."
        open -a XQuartz
        sleep 3  # Wait for XQuartz to start
    fi
    
    # Set up VNC server
    vncserver -kill :1 2>/dev/null || true
    vncserver :1 -geometry 1024x768 -localhost -nolisten tcp
    
    # Start NoVNC
    if [ -d "$HOME/.novnc/noVNC" ]; then
        cd "$HOME/.novnc/noVNC"
        ./utils/launch.sh --vnc localhost:5901 &
    else
        echo "NoVNC not found. Please run setup.sh first."
        exit 1
    fi
else
    # Linux setup remains the same
    Xvfb :1 -screen 0 1024x768x24 &
    sleep 2
    DISPLAY=:1 mutter --replace &
    sleep 2
    DISPLAY=:1 tint2 &
fi