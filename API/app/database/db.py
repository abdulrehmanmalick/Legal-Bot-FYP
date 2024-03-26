from pymongo import MongoClient

# Connect to MongoDB
# Replace the connection string with your actual MongoDB connection string
# It looks something like this: "mongodb+srv://<username>:<password>@<cluster>/<database>"
mongo_uri = "mongodb+srv://hcm-pic:T1DivK9g3Q1h6jgs@cluster0.hulhrpc.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)

# Access the database (creates the database if it doesn't exist)
db = client.get_database('legalbot')
# Define user collection schema (equivalent to a table in MongoDB)
# Define chat collection schema

user_collection = db['User']
chat_collection = db['Chat']