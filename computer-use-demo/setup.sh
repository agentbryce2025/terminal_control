#!/bin/bash
set -e

# Detect OS
OS="$(uname -s)"

if [ "${OS}" = "Darwin" ]; then
    echo "Setting up macOS environment..."
    
    # Install Homebrew if not present
    if ! command -v brew >/dev/null 2>&1; then
        echo "Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    
    # Install Firefox if not present
    if [ ! -d "/Applications/Firefox.app" ]; then
        brew install --cask firefox
    fi
    
    # Install Python if not present
    if ! command -v python3 >/dev/null 2>&1; then
        brew install python@3.9
    fi
    
    # Install other required packages
    brew install imagemagick python-tk@3.9
else
    # Original Linux setup code here
    if command -v apt; then
        sudo apt-get update
        sudo apt-get install -y xvfb x11vnc novnc mutter tint2 firefox-esr xdotool imagemagick python3-tk python3-dev
    elif command -v pacman; then
        sudo pacman -Sy
        sudo pacman -S --noconfirm xorg-server-xvfb x11vnc novnc mutter tint2 firefox xdotool imagemagick tk python-tkinter
    fi
fi

# Create and setup virtual environment
echo "Setting up Python virtual environment..."
python3 -m venv .venv
source .venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
python3 -m pip install --upgrade pip

# Install Python dependencies
echo "Installing Python dependencies..."
if [ -f "dev-requirements.txt" ]; then
    python3 -m pip install -r dev-requirements.txt
fi

# Install the package in editable mode
echo "Installing package in development mode..."
python3 -m pip install -e .

# Create screenshots directory
mkdir -p ~/.anthropic/screenshots
chmod -R 755 ~/.anthropic

echo "Setup completed successfully!"