from django import forms
from django.contrib.auth.forms import UserChangeForm as DjangoUserChangeForm
from .models import User

class UserChangeForm(DjangoUserChangeForm):
    # Coming
    class Meta:
        model = User