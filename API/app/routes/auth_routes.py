from app.types.Response import Response


from app.declarations import StatusCodes as customErrors

from app.lib.Auth import Authorizer
from fastapi import APIRouter

from app.database.collections.user_collection import User_Collection
from app.database.schematics.User import User

from fastapi import HTTPException
from fastapi import Response as FAResponse


router = APIRouter()

class SignIn_Out(Response):
    data: User
    authorization: str = ""
    
    
    
@router.post("/login", response_model=SignIn_Out, response_model_exclude=["data.password"])
def handle_signin(details: User, _response: FAResponse):
    user_from_db = User_Collection.get_one(details.email)

    if not user_from_db:
        raise HTTPException(status_code=404, detail="Invalid email.")

    authorizer = Authorizer()
    is_password_valid = authorizer.verify_password(details.password, user_from_db.password)

    if not is_password_valid:
        raise HTTPException(status_code=401, detail="Invalid password.")
    
    jwt = authorizer.create_access_token(user_from_db)

    user_from_db.password = ""


    response = {
        "message": "User has signed up successfully.",
        "data": user_from_db.model_dump(),
        "authorization": f"Bearer {jwt}"
    }


    _response.headers['Authorization'] = f"Bearer {jwt}"
    return SignIn_Out(**response) 
    

@router.post("/signup", response_model= SignIn_Out)
def handle_signup(details: User):

    database_response = User_Collection.insert(details)

    if database_response == customErrors.EMAIL_ALREADY_EXISTS:
        raise HTTPException(status_code=400, detail="Email already exists.")


    response = {
        "message": "User has signed up successfully.",
        "data": database_response.model_dump()
    }
    return Response(**response)