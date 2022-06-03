from contextlib import suppress
from pathlib import Path
from subprocess import check_output, CalledProcessError, DEVNULL
from typing import Optional


ROOT_DIR = Path(__file__).parent.parent.resolve()


def code_to_ast(code: str) -> Optional[bytes]:
    with suppress(CalledProcessError):
        return check_output(
            ['node', 'src/cli.js', 'code_to_ast', code],
            cwd=str(ROOT_DIR / 'js-ast-parser'),
            stderr=DEVNULL,
        )
