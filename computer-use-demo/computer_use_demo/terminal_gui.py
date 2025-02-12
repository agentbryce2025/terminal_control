"""
Terminal-based GUI control interface.
This module provides terminal-based equivalents for GUI interactions.
"""

import os
import subprocess
from typing import Optional, Tuple, Union

class TerminalGUI:
    def __init__(self, display_num: int = 1, width: int = 1024, height: int = 768):
        self.display_num = display_num
        self.width = width
        self.height = height
        self.display = f":{display_num}"
        self._ensure_x_server()

    def _ensure_x_server(self):
        """Ensure X server and required components are running."""
        if not os.getenv("DISPLAY"):
            os.environ["DISPLAY"] = self.display

        os_type = subprocess.check_output(["uname", "-s"]).decode().strip()
        
        if os_type == "Darwin":
            # For macOS, ensure XQuartz is running
            if not self._is_process_running("Xquartz"):
                subprocess.run(["open", "-a", "XQuartz"])
                # Wait for XQuartz to start
                subprocess.run(["sleep", "2"])
        else:
            # For Linux, check if Xvfb is running
            if not self._is_process_running("Xvfb"):
                subprocess.Popen(["Xvfb", self.display, "-screen", "0", 
                                f"{self.width}x{self.height}x24"])
                
            # Check window manager
            if not self._is_process_running("mutter"):
                subprocess.Popen(["mutter", "--replace"], 
                               env={"DISPLAY": self.display})

            # Check taskbar
            if not self._is_process_running("tint2"):
                subprocess.Popen(["tint2"], 
                               env={"DISPLAY": self.display})

    def _is_process_running(self, process_name: str) -> bool:
        """Check if a process is running."""
        try:
            subprocess.check_output(["pgrep", process_name])
            return True
        except subprocess.CalledProcessError:
            return False

    def mouse_move(self, x: int, y: int) -> None:
        """Move mouse cursor to specified coordinates."""
        subprocess.run(["xdotool", "mousemove", "--sync", str(x), str(y)],
                      env={"DISPLAY": self.display})

    def mouse_click(self, button: int = 1, double: bool = False) -> None:
        """Click mouse button (1=left, 2=middle, 3=right)."""
        if double:
            subprocess.run(["xdotool", "click", "--repeat", "2", "--delay", "500", str(button)],
                         env={"DISPLAY": self.display})
        else:
            subprocess.run(["xdotool", "click", str(button)],
                         env={"DISPLAY": self.display})

    def mouse_drag(self, start_x: int, start_y: int, end_x: int, end_y: int) -> None:
        """Click and drag from start coordinates to end coordinates."""
        cmd = ["xdotool", "mousemove", str(start_x), str(start_y),
               "mousedown", "1",
               "mousemove", str(end_x), str(end_y),
               "mouseup", "1"]
        subprocess.run(cmd, env={"DISPLAY": self.display})

    def type_text(self, text: str, delay_ms: int = 12) -> None:
        """Type text with specified delay between keystrokes."""
        subprocess.run(["xdotool", "type", "--delay", str(delay_ms), text],
                      env={"DISPLAY": self.display})

    def key_press(self, key: str) -> None:
        """Press a key or key combination."""
        subprocess.run(["xdotool", "key", key],
                      env={"DISPLAY": self.display})

    def get_cursor_position(self) -> Tuple[int, int]:
        """Get current cursor position."""
        output = subprocess.check_output(["xdotool", "getmouselocation", "--shell"],
                                       env={"DISPLAY": self.display},
                                       text=True)
        x = int(output.split("X=")[1].split("\n")[0])
        y = int(output.split("Y=")[1].split("\n")[0])
        return (x, y)

    def take_screenshot(self, output_path: str) -> None:
        """Take a screenshot and save it to the specified path."""
        os_type = subprocess.check_output(["uname", "-s"]).decode().strip()
        if os_type == "Darwin":
            # Use screencapture on macOS
            subprocess.run(["screencapture", "-x", output_path],
                         env={"DISPLAY": self.display})
        else:
            # Use import on Linux
            subprocess.run(["import", "-window", "root", output_path],
                         env={"DISPLAY": self.display})

    def start_application(self, app_name: str) -> None:
        """Start an application."""
        subprocess.Popen([app_name], env={"DISPLAY": self.display})