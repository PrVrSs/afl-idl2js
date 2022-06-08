import json

from idl2js.js.mutator import mutate
from idl2js.js.unparser import unparse
from idl2js.js.utils import from_json

from js_ast import code_to_ast


def init(seed: int) -> None:
    """Called once when starts up."""


def deinit() -> None:
    pass


def fuzz(buf: bytearray, add_buf: bytearray, max_size: int) -> bytearray:
    """Called per fuzzing iteration."""
    ast = code_to_ast(buf.decode('utf-8'))
    if ast is None:
        return buf

    mutated_ast = mutate(from_json(json.loads(ast)))

    return bytearray(unparse(mutated_ast).encode())
