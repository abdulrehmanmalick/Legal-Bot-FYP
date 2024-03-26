from app.database.db import db
from app.declarations import StatusCodes as customErrors
from typing import Union
from app.database.collections.Collection import Collection
from app.database.schematics.Chat import Chat
import pymongo
from bson import ObjectId
from fastapi import HTTPException, status

class Chat_Collection(Collection):

    __db = db
    __name = "Chat"
    __collection = __db[__name]

    def insert(chat: Chat) -> Union[Chat, int]:
        result = Chat_Collection.__collection.insert_one(chat.model_dump())
        chat._id = str(result.inserted_id)

        return chat
    
    def get_histories(chat_ids: list[str]) -> Chat:
        filter = {
            "_id" : {
                "$in" : [ObjectId(_id) for _id in chat_ids]
            }
        }

        _ret = Chat_Collection.__collection.find(filter)
        
        # for i in _ret:
        #     print(i)

        __ret = []
        for i in _ret:
            chat:dict = dict(i)
            # print(chat)
            __Chat = Chat(**chat)
            __Chat.chats_id = str(chat['_id'])
            
            __ret.append(__Chat)
        return __ret

    def get_all():
        pass

    def get_many(chats_id: str) -> list[Chat]:
        filter = {
            "chats_id": chats_id
        }

        _ret = Chat_Collection.__collection.find(filter).sort("created_at", pymongo.ASCENDING)

        __ret = []
        for i in _ret:
            new_chat = Chat(**i)
            new_chat.id = str(i['_id'])

            __ret.append(new_chat)


        return __ret
        
        return __ret


    def get_one(chat_id: str) -> Union[Chat, None]:
        _ret = Chat_Collection.__collection.find_one({"_id": ObjectId(chat_id)})

        __ret = Chat(**_ret)
        __ret.id = chat_id
        return __ret
    
    def modify_rating(chat_id: str, rating: int):
        _ret = Chat_Collection.__collection.update_one({"_id", ObjectId(chat_id)}, {"$set": {"rating": rating}})

        if _ret.matched_count != 1:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

        if _ret.modified_count != 1:
            raise HTTPException(status_code=status.HTTP_304_NOT_MODIFIED)
