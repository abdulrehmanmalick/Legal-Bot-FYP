from pydantic import BaseModel


class Authorization(BaseModel):
    email: str
    password: str