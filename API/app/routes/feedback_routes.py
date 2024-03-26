from app.types.Response import Response


from app.declarations import StatusCodes as customErrors

from fastapi import APIRouter

from app.types.feedback import feedbackResponse
from app.database.schematics.Reach_Out import Reach_Out
from app.database.collections.feedback_collection import Feedback_Collection
from fastapi import HTTPException

router = APIRouter()



@router.post("/help", response_model=Response)
def feedback(details: feedbackResponse):
    form_Id = Feedback_Collection.insert(Reach_Out(**details.model_dump()))
    
    response = {
        "message": "Feedback has been received successfully.",
        "data": form_Id._id
    }

    return Response(**response)