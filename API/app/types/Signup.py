from pydantic import BaseModel


class SignUp(BaseModel):
    email: str
    name: str
    password: str