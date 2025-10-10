from django.urls import path
from django.conf.urls import include

urlpatterns = [
    # road login/logout/user
    path('auth/', include('dj_rest_auth.urls')),
    # register
    path('auth/registration/', include('dj_rest_auth.registration.urls'))
]
