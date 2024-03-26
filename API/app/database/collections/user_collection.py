from app.database.schematics.User import User
from app.database.db import db
from app.declarations import StatusCodes as customErrors
from typing import Union
from app.database.collections.Collection import Collection
from app.lib.Auth import Authorizer
from fastapi import HTTPException
from bson import ObjectId

class User_Collection(Collection):

    __db = db
    __name = "User"
    __collection = __db[__name]

    def add_chat_history(user_id, chat_id) -> Union[User, int]:
        _ret = User_Collection.__collection.find_one({"_id": ObjectId(user_id)})
        print(user_id)

        if not _ret:
            raise HTTPException(404, detail="User not found.")
        
        user_chats: list = _ret['chats']
        user_chats.append(chat_id)

        updated_user_data = User_Collection.__collection.update_one({'_id': ObjectId(user_id)}, {'$set': {'chats': user_chats}})

    
    def insert(user:User) -> Union[User, int]:
        
        # check if user with same email already exists
        if User_Collection.__collection.find_one({"email": user.email}):
            return customErrors.EMAIL_ALREADY_EXISTS

        # hash password
        authorizer = Authorizer()
        hashed_pw = authorizer.hash_password(user.password)

        # make a copy of user using the hashed password
        hashed_details = user.model_copy()
        hashed_details.password = hashed_pw

        # insert hashed password user into database
        result = User_Collection.__collection.insert_one(hashed_details.model_dump())
        hashed_details._id = str(result.inserted_id)
        # returning hashed details if user created successfully
        return hashed_details
    
    def get_all():
        pass

    def get_many(query: dict):
        pass

    def get_one(user_email: str) -> Union[User, None]:
        _ret = User_Collection.__collection.find_one({"email": user_email})
    
        if not _ret:
            return None

        __ret = User(**_ret)
        __ret._id = str(_ret["_id"])
        return __ret



