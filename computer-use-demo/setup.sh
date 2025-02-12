#!/bin/bash
set -e

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install package manager if not present
install_package_manager() {
    case "$1" in
        "brew")
            if ! command_exists brew; then
                echo "Installing Homebrew..."
                /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            fi
            ;;
        "apt")
            if command_exists apt; then
                sudo apt-get update
            else
                echo "apt not found. Please install apt or use a supported distribution."
                exit 1
            fi
            ;;
        "pacman")
            if command_exists pacman; then
                sudo pacman -Sy
            else
                echo "pacman not found. Please install pacman or use a supported distribution."
                exit 1
            fi
            ;;
    esac
}

# Check Python version
PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
PYTHON_MINOR_VERSION=$(echo $PYTHON_VERSION | awk -F. '{print $2}')

if [ "$PYTHON_MINOR_VERSION" -gt 12 ]; then
    echo "Python version $PYTHON_VERSION detected. Python 3.12 or lower is required."
    echo "If you have multiple versions of Python installed, you can set the correct one by adjusting setup.sh to use a specific version, for example:"
    echo "'python3 -m venv .venv' -> 'python3.12 -m venv .venv'"
    exit 1
fi

# Check for cargo
if ! command_exists cargo; then
    echo "Installing Rust and Cargo..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source "$HOME/.cargo/env"
fi

# Detect OS and package manager
OS="$(uname -s)"
case "${OS}" in
    Linux*)
        if command_exists apt; then
            PKG_MANAGER="apt"
            install_package_manager "apt"
            echo "Installing system dependencies for Linux (Debian/Ubuntu)..."
            sudo apt-get install -y xvfb x11vnc novnc mutter tint2 firefox-esr xdotool imagemagick python3-tk python3-dev
        elif command_exists pacman; then
            PKG_MANAGER="pacman"
            install_package_manager "pacman"
            echo "Installing system dependencies for Linux (Arch)..."
            sudo pacman -S --noconfirm xorg-server-xvfb x11vnc novnc mutter tint2 firefox xdotool imagemagick tk python-tkinter
        else
            echo "Unsupported Linux distribution. Please install the following packages manually:"
            echo "- X11 server (Xvfb)"
            echo "- VNC server (x11vnc or tigervnc)"
            echo "- noVNC"
            echo "- Window manager (mutter)"
            echo "- Firefox"
            echo "- xdotool"
            echo "- ImageMagick"
            echo "- Python Tk interface"
            exit 1
        fi
        ;;
    Darwin*)
        PKG_MANAGER="brew"
        install_package_manager "brew"
        echo "Installing system dependencies for macOS..."
        
        # Install XQuartz first as it's a prerequisite for other X11 tools
        if ! command_exists xquartz; then
            brew install --cask xquartz
        fi
        
        # Function to install or skip brew packages
        install_brew_package() {
            if brew list "$1" &>/dev/null; then
                echo "Package $1 is already installed"
            else
                brew install "$1" || echo "Failed to install $1, please install manually"
            fi
        }
        
        # Install required packages
        install_brew_package tigervnc      # VNC server
        install_brew_package novnc         # HTML5 VNC client
        install_brew_package mutter        # Window manager
        install_brew_package firefox       # Firefox browser
        install_brew_package xdotool       # X11 automation tool
        install_brew_package imagemagick   # Image manipulation
        brew install python-tk || brew install python-tk@3.9 || echo "Failed to install python-tk, please install manually"
        
        # Create necessary XQuartz configurations
        defaults write org.xquartz.X11 enable_iglx -bool true
        defaults write org.xquartz.X11 app_to_run ""
        ;;
    *)
        echo "Unsupported operating system: ${OS}"
        exit 1
        ;;
esac

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip

# Install Python dependencies
if [ -f "dev-requirements.txt" ]; then
    pip install -r dev-requirements.txt
fi

if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
fi

pip install -e .

# Install pre-commit hooks if .pre-commit-config.yaml exists
if [ -f ".pre-commit-config.yaml" ]; then
    pip install pre-commit
    pre-commit install
fi

# Set up necessary directories
mkdir -p ~/.anthropic/screenshots

# Make the directory accessible
chmod -R 755 ~/.anthropic

echo "Setup completed successfully!"
echo "Note: If you encounter any issues with X11 applications:"
echo "1. Make sure X11 forwarding is enabled if using SSH"
echo "2. For macOS users, make sure XQuartz is running"
echo "3. Try logging out and back in to ensure all environment variables are set"