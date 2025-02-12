"""
Terminal-based interface for the computer use agent.
"""

import asyncio
import base64
import os
import json
from datetime import datetime
from pathlib import Path
from typing import Any, Callable, Optional, cast

from anthropic.types.beta import (
    BetaContentBlockParam,
    BetaTextBlockParam,
    BetaToolResultBlockParam,
)

from .loop import sampling_loop, APIProvider, PROVIDER_TO_DEFAULT_MODEL_NAME
from .tools import ToolResult

class TerminalUI:
    def __init__(self):
        self.messages = []
        self.tools = {}
        self.only_n_most_recent_images = 3
        self.custom_system_prompt = ""
        self.hide_images = False
        
        # Load API key from environment or config file
        self.api_key = os.getenv("ANTHROPIC_API_KEY", "")
        if not self.api_key:
            config_file = Path.home() / ".anthropic" / "api_key"
            if config_file.exists():
                self.api_key = config_file.read_text().strip()

        self.provider = APIProvider(os.getenv("API_PROVIDER", "anthropic"))
        self.model = PROVIDER_TO_DEFAULT_MODEL_NAME[self.provider]

    def get_user_input(self) -> str:
        """Get input from the user."""
        try:
            return input("\nYou: ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\nExiting...")
            exit(0)

    def render_message(self, sender: str, message: Any):
        """Render a message to the terminal."""
        if isinstance(message, str):
            print(f"\n{sender.title()}: {message}")
        elif isinstance(message, dict):
            if message["type"] == "text":
                print(f"\n{sender.title()}: {message['text']}")
            elif message["type"] == "tool_use":
                print(f"\n{sender.title()} Tool Use: {message['name']}")
                print(f"Input: {json.dumps(message['input'], indent=2)}")
        elif hasattr(message, "output") or hasattr(message, "error"):  # ToolResult
            prefix = f"\n{sender.title()}"
            if message.output:
                print(f"{prefix} Output:\n{message.output}")
            if message.error:
                print(f"{prefix} Error: {message.error}")
            if not self.hide_images and message.base64_image:
                # Save image to a file
                img_dir = Path.home() / ".anthropic" / "screenshots"
                img_dir.mkdir(parents=True, exist_ok=True)
                img_path = img_dir / f"screenshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
                img_path.write_bytes(base64.b64decode(message.base64_image))
                print(f"{prefix} Screenshot saved to: {img_path}")

    def tool_output_callback(self, tool_output: ToolResult, tool_id: str):
        """Handle tool output."""
        self.tools[tool_id] = tool_output
        self.render_message("Tool", tool_output)

    def content_output_callback(self, content: BetaContentBlockParam):
        """Handle content output."""
        self.render_message("Assistant", content)

    def api_response_callback(self, request: Any, response: Any, error: Optional[Exception]):
        """Handle API response."""
        if error:
            print(f"\nError: {error}")

    async def run(self):
        """Main interaction loop."""
        print("\nComputer Use Agent Terminal Interface")
        print("----------------------------------")
        
        if not self.api_key:
            print("\nError: ANTHROPIC_API_KEY environment variable or ~/.anthropic/api_key file required")
            return

        while True:
            user_input = self.get_user_input()
            if not user_input:
                continue

            # Add user message
            self.messages.append({
                "role": "user",
                "content": [BetaTextBlockParam(type="text", text=user_input)],
            })
            self.render_message("User", user_input)

            # Run the sampling loop
            try:
                self.messages = await sampling_loop(
                    system_prompt_suffix=self.custom_system_prompt,
                    model=self.model,
                    provider=self.provider,
                    messages=self.messages,
                    output_callback=self.content_output_callback,
                    tool_output_callback=self.tool_output_callback,
                    api_response_callback=self.api_response_callback,
                    api_key=self.api_key,
                    only_n_most_recent_images=self.only_n_most_recent_images,
                )
            except Exception as e:
                print(f"\nError during execution: {e}")

def main():
    """Entry point for the terminal interface."""
    ui = TerminalUI()
    asyncio.run(ui.run())

if __name__ == "__main__":
    main()