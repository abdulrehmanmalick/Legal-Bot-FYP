from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, you can specify specific origins instead
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods, you can specify specific methods instead
    allow_headers=["*"],  # Allow all headers, you can specify specific headers instead
)


from app.routes import routes