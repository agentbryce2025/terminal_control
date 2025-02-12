"""
macOS-specific GUI control functionality using native macOS commands.
"""

import subprocess
import time
import os
from typing import Tuple, Optional

class MacOSGUI:
    @staticmethod
    def launch_app(app_name: str, url: Optional[str] = None) -> None:
        """Launch an application and optionally open a URL."""
        if url:
            subprocess.run(["open", "-a", app_name, url])
        else:
            subprocess.run(["open", "-a", app_name])
        time.sleep(2)  # Wait for app to launch

    @staticmethod
    def activate_app(app_name: str) -> None:
        """Activate (bring to front) an application."""
        script = f'''
            tell application "{app_name}"
                activate
            end tell
        '''
        subprocess.run(["osascript", "-e", script])

    @staticmethod
    def move_mouse(x: int, y: int) -> None:
        """Move the mouse cursor to specific coordinates."""
        script = f'''
            do shell script "defaults write com.apple.universalaccess mouseDriverCursorSize 1"
            tell application "System Events"
                tell process "Finder"
                    set {x} to x coordinate of mouse
                    set {y} to y coordinate of mouse
                end tell
            end tell
        '''
        subprocess.run(["osascript", "-e", script])

    @staticmethod
    def click(double: bool = False) -> None:
        """Perform a mouse click at the current location."""
        if double:
            script = '''
                tell application "System Events"
                    click at (get mouse location)
                    delay 0.1
                    click at (get mouse location)
                end tell
            '''
        else:
            script = '''
                tell application "System Events"
                    click at (get mouse location)
                end tell
            '''
        subprocess.run(["osascript", "-e", script])

    @staticmethod
    def right_click() -> None:
        """Perform a right-click at the current location."""
        script = '''
            tell application "System Events"
                tell process "Finder"
                    perform action "AXShowMenu" of (first UI element whose role description is "button") at mouse location
                end tell
            end tell
        '''
        subprocess.run(["osascript", "-e", script])

    @staticmethod
    def type_text(text: str) -> None:
        """Type text at the current cursor location."""
        script = f'''
            tell application "System Events"
                keystroke "{text}"
            end tell
        '''
        subprocess.run(["osascript", "-e", script])

    @staticmethod
    def press_key(key: str) -> None:
        """Press a specific key."""
        script = f'''
            tell application "System Events"
                key code {key}
            end tell
        '''
        subprocess.run(["osascript", "-e", script])

    @staticmethod
    def take_screenshot(output_path: str) -> None:
        """Take a screenshot of the entire screen."""
        subprocess.run(["screencapture", "-x", output_path])
        
        # Compress the screenshot if ImageMagick is available
        try:
            temp_path = output_path + ".temp"
            os.rename(output_path, temp_path)
            subprocess.run([
                "magick",
                temp_path,
                "-quality", "60",
                "-resize", "1024x768>",
                output_path
            ])
            os.remove(temp_path)
        except (subprocess.CalledProcessError, FileNotFoundError):
            # If compression fails, keep the original screenshot
            if os.path.exists(temp_path):
                os.rename(temp_path, output_path)

    @staticmethod
    def get_frontmost_app() -> str:
        """Get the name of the frontmost application."""
        script = '''
            tell application "System Events"
                get name of first process whose frontmost is true
            end tell
        '''
        result = subprocess.check_output(["osascript", "-e", script], text=True)
        return result.strip()

    @staticmethod
    def get_mouse_location() -> Tuple[int, int]:
        """Get the current mouse cursor location."""
        script = '''
            tell application "System Events"
                get mouse location
            end tell
        '''
        result = subprocess.check_output(["osascript", "-e", script], text=True)
        try:
            x, y = map(int, result.strip().split(", "))
            return (x, y)
        except ValueError:
            return (0, 0)  # Default position if we can't get the actual position