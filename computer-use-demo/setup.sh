#!/bin/bash
set -e

# Check Python version
PYTHON_MINOR_VERSION=$(python3 --version | awk -F. '{print $2}')

if [ "$PYTHON_MINOR_VERSION" -gt 12 ]; then
    echo "Python version 3.$PYTHON_MINOR_VERSION detected. Python 3.12 or lower is required for setup to complete."
    echo "If you have multiple versions of Python installed, you can set the correct one by adjusting setup.sh to use a specific version, for example:"
    echo "'python3 -m venv .venv' -> 'python3.12 -m venv .venv'"
    exit 1
fi

# Check for cargo
if ! command -v cargo &> /dev/null; then
    echo "Cargo (the package manager for Rust) is not present. This is required for one of this module's dependencies."
    echo "See https://www.rust-lang.org/tools/install for installation instructions."
    exit 1
fi

# Detect OS
OS="$(uname -s)"
case "${OS}" in
    Linux*)
        echo "Installing system dependencies for Linux..."
        sudo apt-get update
        sudo apt-get install -y xvfb x11vnc novnc mutter tint2 firefox-esr xdotool imagemagick python3-tk python3-dev
        ;;
    Darwin*)
        echo "Installing system dependencies for macOS..."
        # Install Homebrew if not present
        if ! command -v brew &> /dev/null; then
            echo "Installing Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi
        
        # Install required packages
        brew install xquartz         # X11 server
        brew install tigervnc        # VNC server (alternative to x11vnc)
        brew install noVNC          # HTML5 VNC client
        brew install mutter         # Window manager
        brew install firefox        # Firefox browser
        brew install xdotool        # X11 automation tool
        brew install imagemagick    # Image manipulation
        brew install python-tk      # Python Tk interface
        
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
pip install -r dev-requirements.txt
pip install -e .

# Install pre-commit hooks
pre-commit install

# Set up necessary directories
mkdir -p ~/.anthropic/screenshots

# Make the directory accessible
chmod -R 755 ~/.anthropic

echo "Setup completed successfully!"