from app.database.schematics.User import User

from typing import Optional, Union

from datetime import datetime, timedelta
# from jose import JWTError
import jwt
from fastapi import HTTPException, status
import bcrypt
# from app.database.collections.user_collection import User_Collection


class Authorizer():
    """
    Class to handle FastAPI server authentication using JWT authentication
    """

    def __init__(self):
        # Set secret key, algorithm, expiry time and api key header
        self.SECRET_KEY = "my-secret-key"  # Change this to your own secret key
        self.ALGORITHM = "HS256"
        self.ACCESS_TOKEN_EXPIRE_MINUTES = 30
        self.API_KEY_HEADER = "X-API-Key"  # Change this to the name of your API key header
            
    def create_access_token(self, data: User, expires_delta: Optional[timedelta] = None):
        """
        Creates an access token with expiry.
        Allows for custom expiry time in args, otherwise default expiry time.
        """
        to_encode = {
            "name": data.name,
            "email": data.email,
            "_id": data._id
        }

        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=self.ACCESS_TOKEN_EXPIRE_MINUTES)
        
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.SECRET_KEY, algorithm=self.ALGORITHM)
        
        return encoded_jwt
    
    def hash_password(self, password: str):
        """
        Returns a hashed password using the pwd_context
        """
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """self.pwd_context.hash(password)
        Checks a stored password hash against the password
        """
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

    def decode_access_token(self, token: str):
        """
        Decodes the access token using the secret key, returns a HTTPException if the token is invalid
        """
        try:
            payload = jwt.decode(token, self.SECRET_KEY, algorithms=[self.ALGORITHM])
            return payload
        except Exception:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    def authenticate_user(self, email: str, password: str):
        """
        Authenticates the user by confirming the email exists in the database.
        Then verifies the pass word using self.verify_password 
        """
        # database_reponse = User_Collection.get_one(User(
        #     email=email, 
        #     password=password
        # ))

        # if database_reponse == None:
        #     return None
        
        # if not self.verify_password(password, ["hashed_password"]):
        #     return None, None
        
        # user = User(**database_reponse)
        # return user, self.create_access_token(user)
        pass
    
    def add_user(self, user: User):
        pass

from pydantic import BaseModel, Field
class Auth_Payload(BaseModel):
    name: str
    email: str
    id: str = Field(alias="_id")

class Verification(Authorizer):
    
    def __init__(self):
        super().__init__()
        
    def veryify_user(self, credentials: User):
        user_details, _jwt = self.authenticate_user(email=credentials.email, password=credentials.password)
        if user_details == None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Invalid Credentials"
            )

        return user_details, _jwt
    
    def authorize_user(self, authorization: str):
        # Checking authorization token for the correct format
        authorization = authorization.split(' ')
        if len(authorization) != 2:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized.")
        else:
            authorization = authorization[1]
        
        # Authorize user
        auth_payload = self.decode_access_token(authorization)

        details = Auth_Payload(**auth_payload)
        return details
        