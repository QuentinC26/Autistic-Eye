from django import forms
from django.contrib.auth.forms import UserChangeForm as DjangoUserChangeForm
from .models import User

class UserChangeForm(DjangoUserChangeForm):
    # The meta class allows you to retrieve the User model in model.py
    class Meta:
        model = User
        # i use all fields of class User in model.py
        fields = '__all__'
    