from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from .models import User
from .forms import UserChangeForm


class UserAdmin(BaseUserAdmin):
     form = UserChangeForm
