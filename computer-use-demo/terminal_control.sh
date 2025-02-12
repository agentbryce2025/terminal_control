#!/bin/bash

# Function to display usage information
usage() {
    echo "Usage: $0 <command> [arguments]"
    echo ""
    echo "Available commands:"
    echo "  move <x> <y>      - Move mouse cursor to coordinates"
    echo "  click [right|middle] - Perform mouse click (default: left click)"
    echo "  doubleclick       - Perform double click"
    echo "  drag <x> <y>      - Drag from current position"
    echo "  type <text>       - Type text"
    echo "  key <key>         - Press a key"
    echo "  screenshot        - Take a screenshot"
    echo "  position          - Get cursor position"
    echo "  launch <app>      - Launch application"
    echo ""
    echo "Examples:"
    echo "  $0 move 100 200"
    echo "  $0 type \"Hello, World!\""
    echo "  $0 key Return"
    echo "  $0 screenshot"
}

# Check if DISPLAY is set
if [ -z "$DISPLAY" ]; then
    export DISPLAY=:1
fi

# Detect OS and set up appropriate commands
OS="$(uname -s)"
case "${OS}" in
    Linux*)
        SCREENSHOT_CMD="import -window root"
        ;;
    Darwin*)
        SCREENSHOT_CMD="screencapture -x"
        # Ensure XQuartz is running
        if ! pgrep -x "Xquartz" > /dev/null; then
            open -a XQuartz
            sleep 2  # Wait for XQuartz to start
        fi
        ;;
    *)
        echo "Unsupported operating system: ${OS}"
        exit 1
        ;;
esac

# Main command handler
case "$1" in
    "move")
        if [ -z "$2" ] || [ -z "$3" ]; then
            echo "Error: move requires x and y coordinates"
            usage
            exit 1
        fi
        xdotool mousemove "$2" "$3"
        ;;
    "click")
        case "$2" in
            "right")
                xdotool click 3
                ;;
            "middle")
                xdotool click 2
                ;;
            *)
                xdotool click 1
                ;;
        esac
        ;;
    "doubleclick")
        xdotool click --repeat 2 1
        ;;
    "drag")
        if [ -z "$2" ] || [ -z "$3" ]; then
            echo "Error: drag requires x and y coordinates"
            usage
            exit 1
        fi
        xdotool mousedown 1 mousemove "$2" "$3" mouseup 1
        ;;
    "type")
        if [ -z "$2" ]; then
            echo "Error: type requires text"
            usage
            exit 1
        fi
        xdotool type "$2"
        ;;
    "key")
        if [ -z "$2" ]; then
            echo "Error: key requires key name"
            usage
            exit 1
        fi
        xdotool key "$2"
        ;;
    "screenshot")
        TIMESTAMP=$(date +%Y%m%d_%H%M%S)
        mkdir -p ~/.anthropic/screenshots
        $SCREENSHOT_CMD ~/.anthropic/screenshots/screenshot_${TIMESTAMP}.png
        echo "Screenshot saved to: ~/.anthropic/screenshots/screenshot_${TIMESTAMP}.png"
        ;;
    "position")
        eval $(xdotool getmouselocation --shell)
        echo "Current cursor position: X=$X Y=$Y"
        ;;
    "launch")
        if [ -z "$2" ]; then
            echo "Error: launch requires application name"
            usage
            exit 1
        fi
        nohup "$2" >/dev/null 2>&1 &
        ;;
    *)
        echo "Error: Unknown command '$1'"
        usage
        exit 1
        ;;
esac