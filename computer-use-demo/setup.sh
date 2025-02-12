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
    
    # Check Python version and install python-tk for the current version
    PYTHON_VERSION=$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
    echo "Using Python version ${PYTHON_VERSION}"
    
    # Install python-tk for the current Python version
    brew install python-tk@${PYTHON_VERSION} || brew install python-tk
    
    # Install other required packages
    brew install imagemagick
    
    # Set up GUI control environment
    # Create the helper functions directory
    mkdir -p ~/.computer_use_helpers
    
    # Create the helper functions file
    cat > ~/.computer_use_helpers/macos_functions.sh << 'EOF'
#!/bin/bash

type_text() {
    /usr/bin/osascript << APPLESCRIPT
tell application "System Events"
    keystroke "$1"
end tell
APPLESCRIPT
}

press_key() {
    /usr/bin/osascript << APPLESCRIPT
tell application "System Events"
    key code $1
end tell
APPLESCRIPT
}

open_url() {
    /usr/bin/osascript << APPLESCRIPT
tell application "Firefox"
    activate
    delay 1
    open location "$1"
end tell
APPLESCRIPT
}
EOF

    # Make the helper functions executable
    chmod +x ~/.computer_use_helpers/macos_functions.sh
    
    # Source the helper functions
    source ~/.computer_use_helpers/macos_functions.sh
    
    # Add to .bashrc or .zshrc to ensure functions are always available
    if [ -f ~/.zshrc ]; then
        grep -q "source ~/.computer_use_helpers/macos_functions.sh" ~/.zshrc || echo "source ~/.computer_use_helpers/macos_functions.sh" >> ~/.zshrc
    fi
    if [ -f ~/.bashrc ]; then
        grep -q "source ~/.computer_use_helpers/macos_functions.sh" ~/.bashrc || echo "source ~/.computer_use_helpers/macos_functions.sh" >> ~/.bashrc
    fi
    
    # Create the screenshots directory if it doesn't exist
    mkdir -p ~/.anthropic/screenshots
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