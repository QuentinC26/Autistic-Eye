FROM python:3.10
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
# Copy the contents of app into the docker folder
COPY ./app /app
# Makes the server accessible from outside the container on port 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
