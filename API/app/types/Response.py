from pydantic import BaseModel
from typing import Union

class Response(BaseModel):
    errorCode: int = 0
    errorMsg: str = ""
    message: str
    data: Union[str, dict, list]