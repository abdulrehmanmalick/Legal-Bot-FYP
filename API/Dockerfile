FROM python:3.9.18-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

RUN pip3 uninstall bson -y
RUN pip3 uninstall pymongo -y
RUN pip3 install pymongo


EXPOSE 8000
CMD [ "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]