# Anthropic Computer Use Terminal Demo

This is a modified version of the Anthropic Computer Use Demo that removes the web UI dependency and provides a pure terminal-based interface while maintaining all the original computer use functionality. The setup now supports both Linux and macOS systems.

## Quick Start

### For Linux (Ubuntu/Debian):
1. Install system dependencies:
   ```bash
   sudo apt-get update
   sudo apt-get install -y xvfb x11vnc novnc mutter tint2 firefox-esr xdotool imagemagick python3-tk python3-dev
   ```

### For macOS:
1. The setup script will automatically install Homebrew and required dependencies including:
   - XQuartz (X11 server)
   - TigerVNC (VNC server)
   - noVNC (HTML5 VNC client)
   - Mutter (Window manager)
   - Firefox
   - xdotool
   - ImageMagick
   - Python-tk

### For both systems:
1. Run the setup script:
   ```bash
   ./setup.sh
   ```

2. Set your Anthropic API key:
   ```bash
   export ANTHROPIC_API_KEY=your_api_key_here
   # OR
   echo "your_api_key_here" > ~/.anthropic/api_key
   ```

3. Run the agent:
   ```bash
   ./run_agent.sh
   ```

## Features

- Pure terminal-based interface
- Full computer use functionality
- Screenshot saving and management
- Environment variable configuration
- Support for Anthropic API, Bedrock, and Vertex
- Cross-platform support (Linux and macOS)

## Commands

Available in the terminal interface:

- `help` - Show available commands
- `status` - Show current environment status
- `clear` - Clear conversation history
- `exit` - Exit the program

## Environment Variables

- `DISPLAY` - X11 display (default: :1)
- `WIDTH` - Screen width (default: 1024)
- `HEIGHT` - Screen height (default: 768)
- `ANTHROPIC_API_KEY` - Your Anthropic API key
- `API_PROVIDER` - Choose between 'anthropic', 'bedrock', or 'vertex'

> [!CAUTION]
> Computer use is a beta feature. Please be aware that computer use poses unique risks that are distinct from standard API features or chat interfaces. These risks are heightened when using computer use to interact with the internet. To minimize risks, consider taking precautions such as:
>
> 1. Use a dedicated virtual machine or container with minimal privileges to prevent direct system attacks or accidents.
> 2. Avoid giving the model access to sensitive data, such as account login information, to prevent information theft.
> 3. Limit internet access to an allowlist of domains to reduce exposure to malicious content.
> 4. Ask a human to confirm decisions that may result in meaningful real-world consequences as well as any tasks requiring affirmative consent, such as accepting cookies, executing financial transactions, or agreeing to terms of service.
>
> In some circumstances, Claude will follow commands found in content even if it conflicts with the user's instructions. For example, instructions on webpages or contained in images may override user instructions or cause Claude to make mistakes. We suggest taking precautions to isolate Claude from sensitive data and actions to avoid risks related to prompt injection.
>
> Finally, please inform end users of relevant risks and obtain their consent prior to enabling computer use in your own products.

This repository helps you get started with computer use on Claude in a terminal environment, with reference implementations of:

* Build files to create a Docker container with all necessary dependencies
* A computer use agent loop using the Anthropic API, Bedrock, or Vertex to access the updated Claude 3.5 Sonnet model
* Anthropic-defined computer use tools
* A terminal-based interface for interacting with the agent loop

Please use [this form](https://forms.gle/BT1hpBrqDPDUrCqo7) to provide feedback on the quality of the model responses, the API itself, or the quality of the documentation - we cannot wait to hear from you!

> [!IMPORTANT]
> The Beta API used in this reference implementation is subject to change. Please refer to the [API release notes](https://docs.anthropic.com/en/release-notes/api) for the most up-to-date information.

> [!IMPORTANT]
> The components are weakly separated: the agent loop runs in the container being controlled by Claude, can only be used by one session at a time, and must be restarted or reset between sessions if necessary.

## Docker Support

The Docker container provides a consistent environment for running the demo across different platforms.

### Anthropic API

> [!TIP]
> You can find your API key in the [Anthropic Console](https://console.anthropic.com/).

```bash
export ANTHROPIC_API_KEY=%your_api_key%
docker run \
    -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY \
    -v $HOME/.anthropic:/home/computeruse/.anthropic \
    -it ghcr.io/anthropics/anthropic-quickstarts:computer-use-demo-latest
```

### Terminal-Based GUI Control

This implementation includes a powerful terminal-based GUI control system that allows direct command-line interaction with the graphical interface. The `terminal_control.sh` script provides easy access to these features:

```bash
./terminal_control.sh <command> [arguments]
```

Available commands:
- `move <x> <y>` - Move mouse cursor to coordinates
- `click [right|middle]` - Perform mouse click
- `doubleclick` - Perform double click
- `drag <x> <y>` - Drag from current position
- `type <text>` - Type text
- `key <key>` - Press a key
- `screenshot` - Take a screenshot
- `position` - Get cursor position
- `launch <app>` - Launch application

Example usage:
```bash
# Move mouse to coordinates 100,200
./terminal_control.sh move 100 200

# Type text
./terminal_control.sh type "Hello, World!"

# Press Enter key
./terminal_control.sh key Return

# Take screenshot
./terminal_control.sh screenshot
```

This system allows for scripting of GUI interactions while maintaining full compatibility with the original computer use functionality.

## Error Handling and Troubleshooting

1. **Startup Validation**:
   - Checks for API key presence
   - Validates X server connection
   - Verifies screenshot directory access
   - Reports any setup issues

2. **Runtime Error Handling**:
   - Clear error messages for API issues
   - Tool execution error reporting
   - Ability to continue after errors
   - Status command for diagnostics

3. **Common Issues**:
   - X server connection problems
   - Screenshot directory permissions
   - API authentication errors
   - Tool execution failures

4. **Recovery Options**:
   - Use `status` to check environment
   - `clear` to reset on conversation issues
   - Ctrl+C to interrupt hung operations
   - You can continue after most errors

## Development

```bash
./setup.sh  # configure venv, install development dependencies, and install pre-commit hooks
docker build . -t computer-use-demo:local  # manually build the docker image (optional)
export ANTHROPIC_API_KEY=%your_api_key%
docker run \
    -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY \
    -v $(pwd)/computer_use_demo:/home/computeruse/computer_use_demo/ `# mount local python module for development` \
    -v $HOME/.anthropic:/home/computeruse/.anthropic \
    -it computer-use-demo:local  # can also use ghcr.io/anthropics/anthropic-quickstarts:computer-use-demo-latest
```

The docker run command above mounts the repo inside the docker image, such that you can edit files from the host. The terminal interface will automatically reload when you modify the source files.