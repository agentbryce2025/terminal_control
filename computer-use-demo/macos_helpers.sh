#!/bin/bash

# Helper function to type text using AppleScript
type_text() {
    osascript <<EOF
tell application "System Events"
    keystroke "$1"
end tell
EOF
}

# Helper function to press keys using AppleScript
press_key() {
    osascript <<EOF
tell application "System Events"
    key code $1
end tell
EOF
}

# Helper function to open URLs in Firefox
open_url() {
    osascript <<EOF
tell application "Firefox"
    activate
    delay 1
    open location "$1"
end tell
EOF
}

# Export the functions so they're available to subprocesses
export -f type_text
export -f press_key
export -f open_url