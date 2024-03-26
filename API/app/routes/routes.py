

from app import app
from app.types.Response import Response

@app.get("/")
def handle_root():

    response = {"message": "Alive", "data": "Hello world!"}
    return Response(**response)


###### ADD ROUTER FEEDBACK ######
from app.routes.chat_routes import router as chat_router
from app.routes.auth_routes import router as auth_router
from app.routes.feedback_routes import router as feedback_router

app.include_router(chat_router)
app.include_router(auth_router)
app.include_router(feedback_router)

