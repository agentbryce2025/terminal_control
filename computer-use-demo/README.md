# Anthropic Computer Use Terminal Demo

This is a modified version of the Anthropic Computer Use Demo that removes the web UI dependency and provides a pure terminal-based interface while maintaining all the original computer use functionality.

## Quick Start

1. Install system dependencies (on Ubuntu/Debian):
   ```bash
   sudo apt-get update
   sudo apt-get install -y xvfb x11vnc novnc mutter tint2 firefox-esr xdotool imagemagick python3-tk python3-dev
   ```

2. Run the setup script:
   ```bash
   ./setup.sh
   ```

3. Set your Anthropic API key:
   ```bash
   export ANTHROPIC_API_KEY=your_api_key_here
   # OR
   echo "your_api_key_here" > ~/.anthropic/api_key
   ```

4. Run the agent:
   ```bash
   ./run_agent.sh
   ```

## Features

- Pure terminal-based interface
- Full computer use functionality
- Screenshot saving and management
- Environment variable configuration
- Support for Anthropic API, Bedrock, and Vertex

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

## Quickstart: running the Docker container

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

Once the container is running, see the [Accessing the demo app](#accessing-the-demo-app) section below for instructions on how to connect to the interface.

### Bedrock

> [!TIP]
> To use the new Claude 3.5 Sonnet on Bedrock, you first need to [request model access](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html).

You'll need to pass in AWS credentials with appropriate permissions to use Claude on Bedrock.

You have a few options for authenticating with Bedrock. See the [boto3 documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html#environment-variables) for more details and options.

#### Option 1: (suggested) Use the host's AWS credentials file and AWS profile

```bash
export AWS_PROFILE=<your_aws_profile>
docker run \
    -e API_PROVIDER=bedrock \
    -e AWS_PROFILE=$AWS_PROFILE \
    -e AWS_REGION=us-west-2 \
    -v $HOME/.aws:/home/computeruse/.aws \
    -v $HOME/.anthropic:/home/computeruse/.anthropic \
    -it ghcr.io/anthropics/anthropic-quickstarts:computer-use-demo-latest
```

Once the container is running, see the [Accessing the demo app](#accessing-the-demo-app) section below for instructions on how to connect to the interface.

#### Option 2: Use an access key and secret

```bash
export AWS_ACCESS_KEY_ID=%your_aws_access_key%
export AWS_SECRET_ACCESS_KEY=%your_aws_secret_access_key%
export AWS_SESSION_TOKEN=%your_aws_session_token%
docker run \
    -e API_PROVIDER=bedrock \
    -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
    -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN \
    -e AWS_REGION=us-west-2 \
    -v $HOME/.anthropic:/home/computeruse/.anthropic \
    -it ghcr.io/anthropics/anthropic-quickstarts:computer-use-demo-latest
```

Once the container is running, see the [Accessing the demo app](#accessing-the-demo-app) section below for instructions on how to connect to the interface.

### Vertex

You'll need to pass in Google Cloud credentials with appropriate permissions to use Claude on Vertex.

```bash
docker build . -t computer-use-demo
gcloud auth application-default login
export VERTEX_REGION=%your_vertex_region%
export VERTEX_PROJECT_ID=%your_vertex_project_id%
docker run \
    -e API_PROVIDER=vertex \
    -e CLOUD_ML_REGION=$VERTEX_REGION \
    -e ANTHROPIC_VERTEX_PROJECT_ID=$VERTEX_PROJECT_ID \
    -v $HOME/.config/gcloud/application_default_credentials.json:/home/computeruse/.config/gcloud/application_default_credentials.json \
    -it computer-use-demo
```

Once the container is running, see the [Accessing the demo app](#accessing-the-demo-app) section below for instructions on how to connect to the interface.

This example shows how to use the Google Cloud Application Default Credentials to authenticate with Vertex.

You can also set `GOOGLE_APPLICATION_CREDENTIALS` to use an arbitrary credential file, see the [Google Cloud Authentication documentation](https://cloud.google.com/docs/authentication/application-default-credentials#GAC) for more details.

### Using the Terminal Interface

Once the container is running, you'll be presented with a terminal interface that provides a direct way to interact with Claude's computer use capabilities. Here's a comprehensive guide on how to use it:

#### Setup and Authentication

1. **API Key Configuration**:
   - Set via `ANTHROPIC_API_KEY` environment variable
   - Or create `~/.anthropic/api_key` file with your key
   - The interface will validate the API key on startup

2. **Display Settings**:
   - Default resolution: 1024x768 (XGA)
   - Configurable via `WIDTH` and `HEIGHT` environment variables
   - Display number configurable via `DISPLAY_NUM` (defaults to 1)

#### Available Commands

1. **Special Commands**:
   - `help` - Show available commands and usage information
   - `status` - Display current environment status
   - `clear` - Reset conversation history
   - `exit` - Quit the program

2. **Basic Usage**:
   - Type natural language commands or questions
   - Claude will respond and use appropriate tools
   - Real-time display of tool usage and results
   - Use Ctrl+C to interrupt long operations

3. **Screenshots and Files**:
   - Auto-saved to `~/.anthropic/screenshots/`
   - Timestamped filenames for easy reference
   - Directory structure created automatically
   - Mount `~/.anthropic/` to persist between runs

#### Example Interactions

```
You: Open Firefox and go to anthropic.com
Assistant: I'll help you navigate to anthropic.com...
Tool: Moving mouse to Firefox icon...
Tool: Clicking...
Tool: Waiting for Firefox to open...
Tool: Moving to address bar...
Tool: Typing "anthropic.com"...
Tool: Screenshot saved to: ~/.anthropic/screenshots/screenshot_20250212_012345.png

You: status
Environment Status:
Display: :1
Resolution: 1024x768
API Provider: anthropic
Model: claude-3-5-sonnet-20241022
Messages in history: 2
X Server: Running

You: help
Available Commands:
  help    - Show this help message
  status  - Show current environment status
  clear   - Clear conversation history
  exit    - Exit the program

For general usage:
- Type your questions or commands naturally
- Use Ctrl+C to interrupt a long-running operation
- Screenshots are saved in ~/.anthropic/screenshots/
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

#### Error Handling and Troubleshooting

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

## Screen size

Environment variables `WIDTH` and `HEIGHT` can be used to set the screen size. For example:

```bash
docker run \
    -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY \
    -v $HOME/.anthropic:/home/computeruse/.anthropic \
    -e WIDTH=1920 \
    -e HEIGHT=1080 \
    -it ghcr.io/anthropics/anthropic-quickstarts:computer-use-demo-latest
```

We do not recommend sending screenshots in resolutions above [XGA/WXGA](https://en.wikipedia.org/wiki/Display_resolution_standards#XGA) to avoid issues related to [image resizing](https://docs.anthropic.com/en/docs/build-with-claude/vision#evaluate-image-size).
Relying on the image resizing behavior in the API will result in lower model accuracy and slower performance than implementing scaling in your tools directly. The `computer` tool implementation in this project demonstrates how to scale both images and coordinates from higher resolutions to the suggested resolutions.


When implementing computer use yourself, we recommend using XGA resolution (1024x768):
- For higher resolutions: Scale the image down to XGA and let the model interact with this scaled version, then map the coordinates back to the original resolution proportionally.
- For lower resolutions or smaller devices (e.g. mobile devices): Add black padding around the display area until it reaches 1024x768.

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
