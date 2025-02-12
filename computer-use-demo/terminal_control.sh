#!/bin/bash

# Helper script for terminal-based GUI control

# Set environment variables
export DISPLAY_NUM="${DISPLAY_NUM:-1}"
export DISPLAY=":$DISPLAY_NUM"
export WIDTH="${WIDTH:-1024}"
export HEIGHT="${HEIGHT:-768}"

# Function to print usage
print_usage() {
    echo "Terminal Control Helper"
    echo "Usage: $0 <command> [arguments]"
    echo ""
    echo "Commands:"
    echo "  move <x> <y>           - Move mouse cursor to x,y coordinates"
    echo "  click [right|middle]   - Perform mouse click (default: left click)"
    echo "  doubleclick           - Perform double click"
    echo "  drag <x> <y>          - Drag from current position to x,y"
    echo "  type <text>           - Type the specified text"
    echo "  key <key>             - Press a key (e.g., Return, alt+Tab)"
    echo "  screenshot            - Take a screenshot"
    echo "  position              - Get current cursor position"
    echo "  launch <app>          - Launch an application"
    echo ""
    echo "Environment Variables:"
    echo "  DISPLAY_NUM  - X display number (default: 1)"
    echo "  WIDTH       - Screen width (default: 1024)"
    echo "  HEIGHT      - Screen height (default: 768)"
}

# Check for X server and required components
check_environment() {
    if ! pgrep Xvfb > /dev/null; then
        Xvfb :$DISPLAY_NUM -screen 0 ${WIDTH}x${HEIGHT}x24 &
        sleep 2
    fi
    
    if ! pgrep mutter > /dev/null; then
        DISPLAY=$DISPLAY mutter --replace &
        sleep 2
    fi
    
    if ! pgrep tint2 > /dev/null; then
        DISPLAY=$DISPLAY tint2 &
        sleep 1
    fi
}

# Main command processing
case "$1" in
    "move")
        [ $# -eq 3 ] || { echo "Usage: $0 move <x> <y>"; exit 1; }
        check_environment
        xdotool mousemove $2 $3
        ;;
    "click")
        check_environment
        case "$2" in
            "right") xdotool click 3 ;;
            "middle") xdotool click 2 ;;
            *) xdotool click 1 ;;
        esac
        ;;
    "doubleclick")
        check_environment
        xdotool click --repeat 2 --delay 500 1
        ;;
    "drag")
        [ $# -eq 3 ] || { echo "Usage: $0 drag <x> <y>"; exit 1; }
        check_environment
        xdotool mousedown 1 mousemove $2 $3 mouseup 1
        ;;
    "type")
        [ $# -ge 2 ] || { echo "Usage: $0 type <text>"; exit 1; }
        check_environment
        shift
        xdotool type "$*"
        ;;
    "key")
        [ $# -eq 2 ] || { echo "Usage: $0 key <key>"; exit 1; }
        check_environment
        xdotool key "$2"
        ;;
    "screenshot")
        check_environment
        if command -v gnome-screenshot > /dev/null; then
            gnome-screenshot -f screenshot_$(date +%Y%m%d_%H%M%S).png
        else
            scrot screenshot_$(date +%Y%m%d_%H%M%S).png
        fi
        ;;
    "position")
        check_environment
        xdotool getmouselocation
        ;;
    "launch")
        [ $# -eq 2 ] || { echo "Usage: $0 launch <app>"; exit 1; }
        check_environment
        $2 &
        ;;
    "help"|"--help"|"-h")
        print_usage
        ;;
    *)
        echo "Unknown command: $1"
        print_usage
        exit 1
        ;;
esac