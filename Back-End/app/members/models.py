from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.hashers import make_password


class User(AbstractBaseUser):
# class to manage application registrations
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.IntegerField(default=0)
    location = models.CharField(max_length=50)
    email = models.EmailField(max_length=60, unique=True)
    # password is already included in AbstractBaseUser

# Convert the password to an encrypted version before saving it to the database.
User.password = make_password()
User.save()
