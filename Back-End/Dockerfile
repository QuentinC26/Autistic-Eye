FROM python:3.10
WORKDIR /app
COPY wait-for-db.sh .
COPY entrypoint.sh .
COPY requirements.txt .
# nc is used in wait-for-db.sh to wait until the database is ready
# ca-certificates is used for check SSL certificates
RUN apt-get update && apt-get install -y netcat-openbsd
RUN pip install -r requirements.txt
# Copy the contents of app into the docker folder
COPY ./app /app
# bash -c allows execution of multiple commands in CMD
# Makes the server accessible from outside the container on port 8000
CMD ["bash", "-c", "./wait-for-db.sh && python manage.py runserver 0.0.0.0:8000 & ./entrypoint.sh"]
