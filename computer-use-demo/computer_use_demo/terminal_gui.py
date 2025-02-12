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
        os_type = subprocess.check_output(["uname", "-s"]).decode().strip()
        if os_type == "Darwin":
            # Use AppleScript for mouse movement on macOS
            apple_script = f'''
            tell application "System Events"
                set mouseLocation to {{{x}, {y}}}
            end tell
            '''
            subprocess.run(["osascript", "-e", apple_script])
        else:
            subprocess.run(["xdotool", "mousemove", "--sync", str(x), str(y)],
                          env={"DISPLAY": self.display})

    def mouse_click(self, button: int = 1, double: bool = False) -> None:
        """Click mouse button (1=left, 2=middle, 3=right)."""
        os_type = subprocess.check_output(["uname", "-s"]).decode().strip()
        if os_type == "Darwin":
            # Use AppleScript for mouse clicks on macOS
            button_map = {1: "left", 2: "middle", 3: "right"}
            button_name = button_map.get(button, "left")
            
            if double:
                apple_script = f'''
                tell application "System Events"
                    click at (get mouse location) using {button_name} button
                    delay 0.1
                    click at (get mouse location) using {button_name} button
                end tell
                '''
            else:
                apple_script = f'''
                tell application "System Events"
                    click at (get mouse location) using {button_name} button
                end tell
                '''
            subprocess.run(["osascript", "-e", apple_script])
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
            apple_script = f'''
            tell application "System Events"
                set mouseLocation to {{{start_x}, {start_y}}}
                delay 0.1
                keystroke (key code 0) using {{command down}}
                delay 0.1
                set mouseLocation to {{{end_x}, {end_y}}}
                delay 0.1
                keystroke (key code 1) using {{command down}}
            end tell
            '''
            subprocess.run(["osascript", "-e", apple_script])
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
            apple_script = f'''
            tell application "System Events"
                delay {delay_ms/1000}
                keystroke "{text}"
            end tell
            '''
            subprocess.run(["osascript", "-e", apple_script])
        else:
            subprocess.run(["xdotool", "type", "--delay", str(delay_ms), text],
                          env={"DISPLAY": self.display})

    def key_press(self, key: str) -> None:
        """Press a key or key combination."""
        os_type = subprocess.check_output(["uname", "-s"]).decode().strip()
        if os_type == "Darwin":
            # Convert common key names to AppleScript format
            key_map = {
                "Return": "return",
                "space": "space",
                "Tab": "tab",
                "BackSpace": "delete",
                "Delete": "forward delete",
                "Escape": "escape",
                "Up": "up arrow",
                "Down": "down arrow",
                "Left": "left arrow",
                "Right": "right arrow",
            }
            
            if "+" in key:
                # Handle key combinations (e.g., "ctrl+c")
                parts = key.lower().split("+")
                modifiers = []
                for mod in parts[:-1]:
                    if mod == "ctrl": modifiers.append("command down")
                    elif mod == "alt": modifiers.append("option down")
                    elif mod == "shift": modifiers.append("shift down")
                key = parts[-1]
                
                apple_script = f'''
                tell application "System Events"
                    key code {ord(key) if len(key) == 1 else key_map.get(key, key)} using {{{", ".join(modifiers)}}}
                end tell
                '''
            else:
                # Handle single keys
                key = key_map.get(key, key)
                apple_script = f'''
                tell application "System Events"
                    keystroke "{key}"
                end tell
                '''
            subprocess.run(["osascript", "-e", apple_script])
        else:
            subprocess.run(["xdotool", "key", key],
                          env={"DISPLAY": self.display})

    def get_cursor_position(self) -> Tuple[int, int]:
        """Get current cursor position."""
        os_type = subprocess.check_output(["uname", "-s"]).decode().strip()
        if os_type == "Darwin":
            apple_script = '''
            tell application "System Events"
                get mouse location
            end tell
            '''
            output = subprocess.check_output(["osascript", "-e", apple_script], text=True)
            x, y = map(int, output.strip().split(", "))
            return (x, y)
        else:
            output = subprocess.check_output(["xdotool", "getmouselocation", "--shell"],
                                           env={"DISPLAY": self.display},
                                           text=True)
            x = int(output.split("X=")[1].split("\n")[0])
            y = int(output.split("Y=")[1].split("\n")[0])
            return (x, y)

    def take_screenshot(self, output_path: str) -> None:
        """Take a screenshot and save it to the specified path."""
        os_type = subprocess.check_output(["uname", "-s"]).decode().strip()
        temp_path = output_path + ".temp"
        
        if os_type == "Darwin":
            try:
                # Use screencapture (native macOS tool) to take initial screenshot
                subprocess.run(["screencapture", "-x", temp_path])
                # Compress with convert (from ImageMagick)
                try:
                    subprocess.run([
                        "convert", temp_path,
                        "-quality", "60",
                        "-resize", "1024x768>",
                        output_path
                    ])
                    os.remove(temp_path)
                except FileNotFoundError:
                    # If ImageMagick isn't available, try to use sips (built into macOS)
                    subprocess.run([
                        "sips",
                        "-s", "format", "jpeg",
                        "-s", "formatOptions", "60",
                        "--resampleHeightWidth", "768", "1024",
                        temp_path,
                        "--out", output_path
                    ])
                    os.remove(temp_path)
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
                    # Compress with convert
                    subprocess.run([
                        "convert", output_path,
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
            # On macOS, use AppleScript to launch applications
            app_name = app_name.lower()
            
            # Map common application names to their macOS equivalents
            app_map = {
                "firefox": "Firefox",
                "firefox-esr": "Firefox",
                "chrome": "Google Chrome",
                "chromium": "Google Chrome",
                "safari": "Safari",
                "terminal": "Terminal",
            }
            
            app_name = app_map.get(app_name, app_name.capitalize())
            
            if url and app_name in ["Firefox", "Google Chrome", "Safari"]:
                apple_script = f'''
                tell application "{app_name}"
                    activate
                    open location "{url}"
                end tell
                '''
            else:
                apple_script = f'''
                tell application "{app_name}"
                    activate
                end tell
                '''
            
            subprocess.run(["osascript", "-e", apple_script])
            # Give the application a moment to start
            subprocess.run(["sleep", "2"])
        else:
            if url and app_name in ["firefox", "firefox-esr", "chrome", "chromium"]:
                subprocess.Popen([app_name, url], env={"DISPLAY": self.display})
            else:
                subprocess.Popen([app_name], env={"DISPLAY": self.display})