"""
Modified computer tool to use terminal-based GUI control.
"""

import asyncio
import base64
import os
import shlex
from ..compat import StrEnum
from pathlib import Path
from typing import Literal, TypedDict
from uuid import uuid4

from anthropic.types.beta import BetaToolComputerUse20241022Param

from .base import BaseAnthropicTool, ToolError, ToolResult
from .run import run
from ..terminal_gui import TerminalGUI

OUTPUT_DIR = os.path.expanduser("~/.anthropic/screenshots")
TYPING_DELAY_MS = 12
TYPING_GROUP_SIZE = 50

Action = Literal[
    "key",
    "type",
    "mouse_move",
    "left_click",
    "left_click_drag",
    "right_click",
    "middle_click",
    "double_click",
    "screenshot",
    "cursor_position",
]

class Resolution(TypedDict):
    width: int
    height: int

class ScalingSource(StrEnum):
    COMPUTER = "computer"
    API = "api"

class ComputerToolOptions(TypedDict):
    display_height_px: int
    display_width_px: int
    display_number: int | None

def chunks(s: str, chunk_size: int) -> list[str]:
    return [s[i : i + chunk_size] for i in range(0, len(s), chunk_size)]

class ComputerTool(BaseAnthropicTool):
    """
    A tool that allows terminal-based control of GUI interactions.
    """

    name: Literal["computer"] = "computer"
    api_type: Literal["computer_20241022"] = "computer_20241022"
    width: int
    height: int
    display_num: int | None

    _screenshot_delay = 2.0
    _scaling_enabled = True

    @property
    def options(self) -> ComputerToolOptions:
        width, height = self.scale_coordinates(
            ScalingSource.COMPUTER, self.width, self.height
        )
        return {
            "display_width_px": width,
            "display_height_px": height,
            "display_number": self.display_num,
        }

    def to_params(self) -> BetaToolComputerUse20241022Param:
        return {"name": self.name, "type": self.api_type, **self.options}

    def __init__(self):
        super().__init__()

        self.width = int(os.getenv("WIDTH") or 1024)
        self.height = int(os.getenv("HEIGHT") or 768)
        self.display_num = int(os.getenv("DISPLAY_NUM") or 1)

        # Initialize TerminalGUI
        self.gui = TerminalGUI(
            display_num=self.display_num,
            width=self.width,
            height=self.height
        )

    async def __call__(
        self,
        *,
        action: Action,
        text: str | None = None,
        coordinate: tuple[int, int] | None = None,
        **kwargs,
    ):
        if action in ("mouse_move", "left_click_drag"):
            if coordinate is None:
                raise ToolError(f"coordinate is required for {action}")
            if text is not None:
                raise ToolError(f"text is not accepted for {action}")
            if not isinstance(coordinate, list) or len(coordinate) != 2:
                raise ToolError(f"{coordinate} must be a tuple of length 2")
            if not all(isinstance(i, int) and i >= 0 for i in coordinate):
                raise ToolError(f"{coordinate} must be a tuple of non-negative ints")

            x, y = self.scale_coordinates(
                ScalingSource.API, coordinate[0], coordinate[1]
            )

            if action == "mouse_move":
                self.gui.mouse_move(x, y)
                return await self.take_screenshot()
            elif action == "left_click_drag":
                current_x, current_y = self.gui.get_cursor_position()
                self.gui.mouse_drag(current_x, current_y, x, y)
                return await self.take_screenshot()

        if action in ("key", "type"):
            if text is None:
                raise ToolError(f"text is required for {action}")
            if coordinate is not None:
                raise ToolError(f"coordinate is not accepted for {action}")
            if not isinstance(text, str):
                raise ToolError(output=f"{text} must be a string")

            if action == "key":
                self.gui.key_press(text)
                return await self.take_screenshot()
            elif action == "type":
                for chunk in chunks(text, TYPING_GROUP_SIZE):
                    self.gui.type_text(chunk, TYPING_DELAY_MS)
                return await self.take_screenshot()

        if action in ("left_click", "right_click", "double_click", "middle_click",
                     "screenshot", "cursor_position"):
            if text is not None:
                raise ToolError(f"text is not accepted for {action}")
            if coordinate is not None:
                raise ToolError(f"coordinate is not accepted for {action}")

            if action == "screenshot":
                return await self.take_screenshot()
            elif action == "cursor_position":
                x, y = self.gui.get_cursor_position()
                scaled_x, scaled_y = self.scale_coordinates(
                    ScalingSource.COMPUTER, x, y
                )
                return ToolResult(output=f"X={scaled_x},Y={scaled_y}")
            else:
                button = {
                    "left_click": 1,
                    "right_click": 3,
                    "middle_click": 2,
                }
                is_double = action == "double_click"
                self.gui.mouse_click(
                    button=button.get(action, 1),
                    double=is_double
                )
                return await self.take_screenshot()

        raise ToolError(f"Invalid action: {action}")

    async def take_screenshot(self) -> ToolResult:
        """Take a screenshot and return it as a ToolResult."""
        output_dir = Path(OUTPUT_DIR)
        output_dir.mkdir(parents=True, exist_ok=True)
        path = output_dir / f"screenshot_{uuid4().hex}.png"

        self.gui.take_screenshot(str(path))
        await asyncio.sleep(self._screenshot_delay)

        if path.exists():
            image_data = base64.b64encode(path.read_bytes()).decode()
            return ToolResult(base64_image=image_data)
        raise ToolError("Failed to take screenshot")

    def scale_coordinates(self, source: ScalingSource, x: int, y: int):
        """Scale coordinates based on source and target resolution."""
        if not self._scaling_enabled:
            return x, y

        # For now we'll use a simple scaling based on the actual display size
        if source == ScalingSource.API:
            # Scale up from API coordinates to actual display
            return (x, y)
        else:
            # Scale down from actual display to API coordinates
            return (x, y)