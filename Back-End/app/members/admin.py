from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from .models import User
from .forms import UserChangeForm


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    # for modify the user information by an admin
    fieldsets = (
        (('Basics Informations'), {'fields': ('first_name', 'last_name', 'age', 'location')}),
        (('Connexion'), {'fields': ('email', 'password')}),
        (('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    # Defines the columns that appear in the user list in the admin interface
    list_display = ['first_name', 'last_name', 'age', 'location', 'email', 'is_staff']
    # search for a user by typing a value in the search bar of the admin panel
    search_fields = ('first_name', 'last_name', 'age', 'location', 'email')
    # Defines in what order users are listed in the admin.
    ordering = ('first_name', )

# This line allows the display of the UserAdmin model in the administration interface
admin.site.register(User, UserAdmin)
