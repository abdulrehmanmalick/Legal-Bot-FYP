

from app.database.db import db
from app.declarations import StatusCodes as customErrors
from typing import Union
from app.database.collections.Collection import Collection
from app.database.schematics.Reach_Out import Reach_Out

from app.types.Response import Response
from fastapi import HTTPException
from fastapi import status

class Feedback_Collection(Collection):

    __db = db
    __name = "Feedback"
    __collection = __db[__name]

    def insert(form: Reach_Out) -> Union[Reach_Out, int]:
        if not form.message or not form.email or not form.name:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="One of the parameters is missing.")
        
        result = Feedback_Collection.__collection.insert_one(form.model_dump())  # Convert to dictionary before inserting
        form._id = str(result.inserted_id)
        
        return form

    def get_all():
        pass

    def get_many(query: dict):
        pass

    def get_one(form: Reach_Out) -> Union[Reach_Out, None]:
        _ret = Feedback_Collection.__collection.find_one({"_id": form._id})

        __ret = Reach_Out(**_ret)
        return __ret