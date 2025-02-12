#!/bin/bash
set -e

./start_all.sh

echo "✨ Computer Use Terminal Demo is ready!"
echo "➡️  Type your commands to interact with the computer use agent..."

# Run the terminal interface
PYTHONPATH=$HOME python -m computer_use_demo.terminal
