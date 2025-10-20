from django.urls import path
from django.conf.urls import include
from dj_rest_auth.views import PasswordResetConfirmView
from .views import CustomRegisterView
from .views import VerifyEmailView
from .views import CustomLoginView
from .views import UserProfileView 
from .views import UpdateProfileView

urlpatterns = [
    # Redefines login route to use custom view which blocks non-email verified users
    path('auth/login/', CustomLoginView.as_view(), name='custom_login'),
    # for use the custom register 
    path('auth/registration/', CustomRegisterView.as_view(), name='custom_register'),
    # To have user verification by email
    path('auth/verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    # Route to confirm password reset (used in email link)
    path('auth/password/reset/confirm/<uidb64>/<token>', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    # road login/logout/missing password
    path('auth/', include('dj_rest_auth.urls')),
    # road to profile
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    # road to modify a data in profile
    path('profile/update/', UpdateProfileView.as_view(), name='user-profile-update'),
]
