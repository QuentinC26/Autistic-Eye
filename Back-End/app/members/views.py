from dj_rest_auth.registration.views import RegisterView
from .serializers import CompleteUserSerializer
from django.core.mail import send_mail
from django.conf import settings
from .utils import generate_email_token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .utils import verify_email_token

class CustomRegisterView(RegisterView):
    # Determines CompleteUserSerializer as the view used to register.
    serializer_class = CompleteUserSerializer

   # Method automatically called after validation of the registration form which allows the addition of custom actions... 
   # ...after the creation of the new user.
   # perform_create is a name imposed by the Django REST Framework (DRF)
    def perform_create(self, serializer):
      # Creates and saves the user in the database with the received data
      user = serializer.save(self.request)
      # Allows you to say that the account is not yet validated by email and saves this modification
      user.is_verified = False
      user.save()
      # Create a token to verify the user via their email
      token = generate_email_token(user.email)
      # Construct a full URL that the user will click in the email with the token as a parameter.
      verification_link = f"http://localhost:5173/verify-email?token={token}"

      send_mail(
        # Subject of the email
        'Confirmez votre adresse email',
        # Message of the email
        f'Bonjour {user.first_name},\n\nMerci de vous être inscrit. Cliquez sur ce lien pour vérifier votre adresse email : {verification_link}',
        # The one who sends the email
        settings.DEFAULT_FROM_EMAIL,
        # The one who receives the email
        [user.email],
        # Know if there is a sending error
        fail_silently=False,
        )
    
class VerifyEmailView(APIView):
    def get(self, request):
        token = request.GET.get('token')
        if not token:
            return Response({"detail": "Token manquant."}, status=status.HTTP_400_BAD_REQUEST)

        email = verify_email_token(token)
        if not email:
            return Response({"detail": "Token invalide ou expiré."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "Utilisateur non trouvé."}, status=status.HTTP_404_NOT_FOUND)

        if user.is_verified:
            return Response({"detail": "Compte déjà vérifié."})

        user.is_verified = True
        user.save()
        return Response({"detail": "Email vérifié avec succès."})