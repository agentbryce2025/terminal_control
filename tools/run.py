import asyncio
from typing import Tuple

async def run(cmd: str) -> Tuple[int, str, str]:
    proc = await asyncio.create_subprocess_shell(
        cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE
    )

    stdout, stderr = await proc.communicate()
    
    return (
        proc.returncode or 0,
        stdout.decode() if stdout else "",
        stderr.decode() if stderr else "",
    )