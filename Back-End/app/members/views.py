from dj_rest_auth.registration.views import RegisterView
from .serializers import CompleteUserSerializer

class CustomRegisterView(RegisterView):
    # Determines CompleteUserSerializer as the view used to register.
    serializer_class = CompleteUserSerializer
