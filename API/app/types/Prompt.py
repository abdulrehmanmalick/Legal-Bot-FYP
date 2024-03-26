from pydantic import BaseModel
from typing import Union


class Prompt(BaseModel):
    prompt: str
    chats_id: Union[str, None] = None