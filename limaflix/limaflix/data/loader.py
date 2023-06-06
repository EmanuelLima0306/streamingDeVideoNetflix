# limaflix:data:loader
import json
from pathlib import Path


def load_filmes() -> list:
    f = Path(__file__).with_name("filmes.json")

    with open(f, 'r',encoding='utf-8') as file:
        return json.load(file)
