#!/bin/bash

# Set default display if not set
if [ -z "$DISPLAY" ]; then
    export DISPLAY=:1
fi

# Set default screen resolution if not set
if [ -z "$WIDTH" ]; then
    export WIDTH=1024
fi
if [ -z "$HEIGHT" ]; then
    export HEIGHT=768
fi

# Activate virtual environment if it exists
if [ -d ".venv" ]; then
    source .venv/bin/activate
fi

# Run the computer agent
computer-agent