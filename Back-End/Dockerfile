FROM python:3.10
WORKDIR /app
COPY wait-for-db.sh wait-for-db.sh
COPY requirements.txt .
# nc is used in wait-for-db.sh to wait until the database is ready
RUN apt-get update && apt-get install -y netcat-openbsd
RUN pip install -r requirements.txt
# Copy the contents of app into the docker folder
COPY ./app /app
# Makes the server accessible from outside the container on port 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
