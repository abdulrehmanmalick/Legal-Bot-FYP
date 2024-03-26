from pydantic import BaseModel, Field
from typing import Union, Optional
from datetime import datetime
from bson import ObjectId

class CustomBaseModel(BaseModel):
    class Config:
        allow_population_by_name = True
        json_encoders = {
            ObjectId: lambda v: str(v)
        }

class Schema(CustomBaseModel):
    _id: Union[str, None] = None
    id: Optional[str] = None
    created_at: Union[datetime, None] = datetime.now()
    last_updated: Union[datetime, None] = datetime.now()