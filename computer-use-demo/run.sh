#!/bin/bash
set -e

# Start Xvfb if not already running
if ! pgrep -x Xvfb > /dev/null; then
    Xvfb :1 -screen 0 1024x768x24 &
    sleep 2
    echo "Xvfb started on display :1"
fi

# Start window manager if not already running
if ! pgrep -x mutter > /dev/null; then
    DISPLAY=:1 mutter --replace &
    sleep 2
    echo "Mutter window manager started"
fi

# Start taskbar if not already running
if ! pgrep -x tint2 > /dev/null; then
    DISPLAY=:1 tint2 &
    sleep 2
    echo "Tint2 taskbar started"
fi

# Set default screen resolution if not specified
export WIDTH=${WIDTH:-1024}
export HEIGHT=${HEIGHT:-768}
export DISPLAY_NUM=${DISPLAY_NUM:-1}

# Activate virtual environment
source .venv/bin/activate

# Run the computer agent
echo "Starting Computer Use Agent..."
DISPLAY=:1 python -m computer_use_demo.terminal