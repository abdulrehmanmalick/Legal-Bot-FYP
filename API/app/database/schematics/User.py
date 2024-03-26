from datetime import datetime
from typing import Optional, Union
from app.database.schematics.Schema import Schema

class User(Schema):
    email: str
    password: str
    name: Union[str, None] = None

    chats: Union[list[str], None] = []