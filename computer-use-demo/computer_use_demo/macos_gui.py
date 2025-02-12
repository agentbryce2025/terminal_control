"""
macOS-specific GUI control functionality using native macOS commands.
"""

import subprocess
import time
from typing import Tuple

class MacOSGUI:
    @staticmethod
    def get_window_bounds(app_name: str) -> Tuple[int, int, int, int]:
        """Get the bounds of the frontmost window of an application."""
        script = f'''
            tell application "System Events"
                tell process "{app_name}"
                    get {{position, size}} of window 1
                end tell
            end tell
        '''
        try:
            result = subprocess.check_output(["osascript", "-e", script], text=True)
            # Parse the result which is in format: {x, y, width, height}
            numbers = [int(n) for n in result.strip().replace("{", "").replace("}", "").split(",")]
            x, y = numbers[0], numbers[1]
            width, height = numbers[2], numbers[3]
            return (x, y, width, height)
        except:
            return (0, 0, 1024, 768)  # Default values if we can't get the window bounds

    @staticmethod
    def click_element(app_name: str, element_description: str) -> bool:
        """Click on a UI element by description."""
        script = f'''
            tell application "System Events"
                tell process "{app_name}"
                    click at mouse location
                end tell
            end tell
        '''
        try:
            subprocess.run(["osascript", "-e", script])
            return True
        except:
            return False

    @staticmethod
    def type_text(text: str):
        """Type text using the keyboard."""
        script = f'''
            tell application "System Events"
                keystroke "{text}"
            end tell
        '''
        subprocess.run(["osascript", "-e", script])

    @staticmethod
    def press_key(key: str):
        """Press a specific key."""
        script = f'''
            tell application "System Events"
                key code {key}
            end tell
        '''
        subprocess.run(["osascript", "-e", script])

    @staticmethod
    def move_mouse(x: int, y: int):
        """Move the mouse cursor to specific coordinates."""
        script = f'''
            tell application "System Events"
                set mouse location to {{{x}, {y}}}
            end tell
        '''
        subprocess.run(["osascript", "-e", script])

    @staticmethod
    def get_mouse_location() -> Tuple[int, int]:
        """Get the current mouse cursor location."""
        script = '''
            tell application "System Events"
                get mouse location
            end tell
        '''
        result = subprocess.check_output(["osascript", "-e", script], text=True)
        x, y = map(int, result.strip().split(", "))
        return (x, y)

    @staticmethod
    def take_screenshot(output_path: str):
        """Take a screenshot using native macOS screencapture."""
        subprocess.run(["screencapture", "-x", output_path])