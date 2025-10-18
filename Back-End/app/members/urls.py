from django.urls import path
from django.conf.urls import include
from .views import CustomRegisterView
from .views import VerifyEmailView
from .views import CustomLoginView

urlpatterns = [
    # Redefines login route to use custom view which blocks non-email verified users
    path('auth/login/', CustomLoginView.as_view(), name='custom_login'),
    # for use the custom register 
    path('auth/registration/', CustomRegisterView.as_view(), name='custom_register'),
    # To have user verification by email
    path('auth/verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    # road login/logout/missing password
    path('auth/', include('dj_rest_auth.urls')),
]
