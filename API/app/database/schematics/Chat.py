from app.types.Prompt import Prompt
from typing import Union, Optional
from app.database.schematics.Schema import Schema

class Chat(Schema, Prompt):
    response: Union[str, None] = None
    rating: Optional[int] = 0