from pydantic import BaseModel
from typing import Union

class feedbackResponse(BaseModel):
    name: str
    email: str
    message:str