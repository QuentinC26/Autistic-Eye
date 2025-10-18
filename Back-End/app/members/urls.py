from django.urls import path
from django.conf.urls import include
from .views import CustomRegisterView 

urlpatterns = [
    # road login/logout/missing password
    path('auth/', include('dj_rest_auth.urls')),
    # for use the custom register 
    path('auth/registration/', CustomRegisterView.as_view(), name='custom_register')
]
