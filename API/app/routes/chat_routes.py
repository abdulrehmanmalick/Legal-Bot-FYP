from app import app
from app.types.Response import Response
from app.types.Prompt import Prompt
from fastapi import status
from fastapi import APIRouter
from app.declarations import StatusCodes as customErrors
from app.database.db import  chat_collection
from app.database.collections.chat_collection import Chat_Collection
from app.database.collections.user_collection import User_Collection
from app.lib.Auth import Verification
from fastapi import HTTPException
from fastapi import Header
from pydantic import ValidationError


router = APIRouter()

from app.database.schematics.Chat import Chat
from app.lib.LLM import ChatModel
chat_model = ChatModel()


@router.post("/chat")
async def handle_post_chat(prompt: Prompt, authorization: str = Header(None)) -> Response:

    chat_data = Chat(prompt=prompt.prompt, chats_id=prompt.chats_id)
    if prompt.prompt == "":
        response = {
            "errorCode": customErrors.NO_PROMPT_GIVEN,
            "message": "No prompt given.",
            "data": {
                "prompt": chat_data.prompt,
                "response": "Welcome to LegalBot. How may I help you today?"
            }
        }
        return Response(**response)


    # chat_data.response = chat_model.make_chat(prompt.prompt)["result"]
    chat_data.response = "Hello world"

    try:
        if authorization:
            authorizer = Verification()
            auth_payload = authorizer.authorize_user(authorization)

            db_chat_data = Chat_Collection.insert(chat_data)

            if not chat_data.chats_id:
                User_Collection.add_chat_history(user_id=auth_payload.id, chat_id=db_chat_data._id)

                chat_data.chats_id = db_chat_data._id

    except Exception as e:
        print(e)
        raise e
    finally:
        response = {
            "message": "Prompt generated successfully.",
            "data": {
                "chats_id": chat_data.chats_id,
                "_id": chat_data._id, 
                "prompt": chat_data.prompt,
                "response": chat_data.response
            }
        }
        return Response(**response)
    
@router.get("/chats")
def handle_get_all_chats(authorization: str = Header()) -> Response:

    authorizer = Verification()
    auth_payload = authorizer.authorize_user(authorization)

    chats = Chat_Collection.get_many(auth_payload.id)

    response = {
        "message": "Chats retrieved successfully",
        "data": {
            "length": len(chats),
            "chats": chats
        }
    }
    return Response(**response)

from pydantic import create_model
from fastapi import Depends

query_params_history = {"chats_id": (str, "")}
query_model_history = create_model("Query", **query_params_history)

from app.database.schematics.User import User

@router.get("/one_history")
def handle_get_one_chat_history(params: query_model_history = Depends(None), authorization: str = Header()) -> Response:

    authorizer = Verification()
    auth_payload = authorizer.authorize_user(authorization)

    print(params.chats_id)

    if params.chats_id == "":
        raise HTTPException(422, "invalid Chats_id")
    
    chat_head = Chat_Collection.get_one(chat_id=params.chats_id)
    chats: list = Chat_Collection.get_many(chats_id=params.chats_id)
    
    chats.insert(0, chat_head)

    response = {
        "message": "Chats retrieved successfully",
        "data": {
            "length": len(chats),
            "chats": chats
        }
    }
    return Response(**response)

@router.get("/history")
def handle_get_histories(authorization: str = Header()) -> Response:

    authorizer = Verification()
    auth_payload = authorizer.authorize_user(authorization)

    user_data = User_Collection.get_one(auth_payload.email)

    history_chats = Chat_Collection.get_histories(user_data.chats)

    response = {
        "message": "Chats retrieved successfully",
        "data": {
            "length": len(history_chats),
            "chats": history_chats
        }
    }
    return Response(**response)


query_params = {"id": (str, ""), "rating": (int, 0)}
query_model = create_model("Query", **query_params)

@router.post("/chat/rating")
def handle_rate_chat(params: query_model = Depends(None), authorization: str = Header()):
    
    authorizer = Verification()
    auth_payload = authorizer.authorize_user(authorization)
    
    if not params.id or not params.rating:
        raise HTTPException(status_code=status.HTTP_423_LOCKED)
    
    Chat_Collection.modify_rating(params.id, params.rating)
    modified_chat = Chat_Collection.get_one(chat_id=params.id)

    response = {
        "message": "Rating added.",
        "data": modified_chat.model_dump()
    }
    return Response(**response)

    

    
    
    
    

