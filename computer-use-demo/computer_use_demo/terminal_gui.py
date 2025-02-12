"""
Terminal-based GUI control interface.
This module provides terminal-based equivalents for GUI interactions.
"""

import os
import subprocess
import time
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

    def _is_process_running(self, process_name: str) -> bool:
        """Check if a process is running."""
        try:
            subprocess.check_output(["pgrep", process_name])
            return True
        except subprocess.CalledProcessError:
            return False

    def mouse_move(self, x: int, y: int) -> None:
        """Move mouse cursor to specified coordinates."""
        os_type = subprocess.check_output(["uname", "-s"]).decode().strip()
        if os_type == "Darwin":
            # On macOS, we don't actually move the mouse
            pass
        else:
            subprocess.run(["xdotool", "mousemove", "--sync", str(x), str(y)],
                          env={"DISPLAY": self.display})

    def mouse_click(self, button: int = 1, double: bool = False) -> None:
        """Click mouse button (1=left, 2=middle, 3=right)."""
        os_type = subprocess.check_output(["uname", "-s"]).decode().strip()
        if os_type == "Darwin":
            # On macOS, we use direct browser control instead
            pass
        else:
            if double:
                subprocess.run(["xdotool", "click", "--repeat", "2", "--delay", "500", str(button)],
                             env={"DISPLAY": self.display})
            else:
                subprocess.run(["xdotool", "click", str(button)],
                             env={"DISPLAY": self.display})

    def mouse_drag(self, start_x: int, start_y: int, end_x: int, end_y: int) -> None:
        """Click and drag from start coordinates to end coordinates."""
        os_type = subprocess.check_output(["uname", "-s"]).decode().strip()
        if os_type == "Darwin":
            # On macOS, we don't use mouse dragging
            pass
        else:
            cmd = ["xdotool", "mousemove", str(start_x), str(start_y),
                   "mousedown", "1",
                   "mousemove", str(end_x), str(end_y),
                   "mouseup", "1"]
            subprocess.run(cmd, env={"DISPLAY": self.display})

    def type_text(self, text: str, delay_ms: int = 12) -> None:
        """Type text with specified delay between keystrokes."""
        os_type = subprocess.check_output(["uname", "-s"]).decode().strip()
        if os_type == "Darwin":
            # Use the type_text helper function
            escaped_text = text.replace("'", "'\\''")
            subprocess.run(["/bin/bash", "-c", f"type_text '{escaped_text}'"])
            time.sleep(delay_ms / 1000)  # Convert ms to seconds
        else:
            subprocess.run(["xdotool", "type", "--delay", str(delay_ms), text],
                          env={"DISPLAY": self.display})

    def key_press(self, key: str) -> None:
        """Press a key combination."""
        os_type = subprocess.check_output(["uname", "-s"]).decode().strip()
        if os_type == "Darwin":
            # Map common keys to macOS key codes
            key_map = {
                "Return": "36",
                "space": "49",
                "Tab": "48",
                "BackSpace": "51",
                "Delete": "117",
                "Escape": "53",
                "Up": "126",
                "Down": "125",
                "Left": "123",
                "Right": "124",
            }
            
            if "+" in key:
                # Handle key combinations by converting to individual presses
                parts = key.lower().split("+")
                for part in parts:
                    key_code = key_map.get(part, str(ord(part)))
                    subprocess.run(["/bin/bash", "-c", f"press_key {key_code}"])
                    time.sleep(0.1)
            else:
                # Handle single keys
                key_code = key_map.get(key, str(ord(key)))
                subprocess.run(["/bin/bash", "-c", f"press_key {key_code}"])
        else:
            subprocess.run(["xdotool", "key", key],
                          env={"DISPLAY": self.display})

    def take_screenshot(self, output_path: str) -> None:
        """Take a screenshot of the entire screen."""
        os_type = subprocess.check_output(["uname", "-s"]).decode().strip()
        temp_path = output_path + ".temp"
        
        if os_type == "Darwin":
            try:
                # Use screencapture (native macOS tool) to take screenshot
                subprocess.run(["screencapture", "-x", temp_path])
                # Compress with magick (from ImageMagick 7+)
                try:
                    subprocess.run([
                        "magick", temp_path,
                        "-quality", "60",
                        "-resize", "1024x768>",
                        output_path
                    ])
                    os.remove(temp_path)
                except (subprocess.CalledProcessError, FileNotFoundError):
                    # If compression fails, use the original screenshot
                    os.rename(temp_path, output_path)
            except FileNotFoundError:
                raise RuntimeError("Screenshot failed. On macOS, ensure 'screencapture' is available (should be built-in)")
        else:
            # On Linux, try scrot first, then fall back to import
            try:
                subprocess.run(["scrot", "-q", "60", output_path],
                             env={"DISPLAY": self.display})
            except FileNotFoundError:
                try:
                    subprocess.run(["import", "-window", "root", output_path],
                                env={"DISPLAY": self.display})
                    # Compress with magick
                    subprocess.run([
                        "magick", output_path,
                        "-quality", "60",
                        "-resize", "1024x768>",
                        temp_path
                    ])
                    os.rename(temp_path, output_path)
                except FileNotFoundError:
                    raise RuntimeError("No screenshot tool found. On Linux, please install either 'scrot' or 'imagemagick'")

    def start_application(self, app_name: str, url: str = None) -> None:
        """Start an application."""
        os_type = subprocess.check_output(["uname", "-s"]).decode().strip()
        if os_type == "Darwin":
            app_name = app_name.lower()
            
            # Map common application names
            app_map = {
                "firefox": "Firefox",
                "firefox-esr": "Firefox",
                "chrome": "Google Chrome",
                "chromium": "Google Chrome",
                "safari": "Safari",
                "terminal": "Terminal",
            }
            
            app_name = app_map.get(app_name, app_name.capitalize())
            
            if url:
                # Use the open_url helper function
                subprocess.run(["/bin/bash", "-c", f"open_url '{url}'"])
            else:
                # Just open the app
                subprocess.run(["open", "-a", app_name])
            
            # Give the application a moment to start/activate
            time.sleep(2)
        else:
            if url and app_name in ["firefox", "firefox-esr", "chrome", "chromium"]:
                subprocess.Popen([app_name, url], env={"DISPLAY": self.display})
            else:
                subprocess.Popen([app_name], env={"DISPLAY": self.display})