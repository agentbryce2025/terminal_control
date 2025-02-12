from abc import ABC
from dataclasses import dataclass
from typing import Any, Optional

@dataclass
class ToolResult:
    output: Optional[str]
    error: Optional[str]
    base64_image: Optional[str]

    def replace(self, **kwargs):
        return ToolResult(**{**self.__dict__, **kwargs})

class ToolError(Exception):
    def __init__(self, output: str):
        self.output = output
        super().__init__(output)

class BaseAnthropicTool(ABC):
    async def __call__(self, **kwargs) -> Any:
        raise NotImplementedError