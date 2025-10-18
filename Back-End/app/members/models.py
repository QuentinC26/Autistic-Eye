from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
# If variables are not in the User class, those from the AbstractUser class are taken
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.IntegerField(default=0)
    location = models.CharField(max_length=50)
    email = models.EmailField(max_length=60, unique=True)
    
    # for connect in the application, you can write the email
    USERNAME_FIELD = 'email'
    # Information requested when creating a superuser
    REQUIRED_FIELDS = ['first_name', 'last_name']
    # Field to verify email
    is_verified = models.BooleanField(default=False)

    # Displays the user's email in the admin, console or logs
    def __str__(self):
      return self.email
