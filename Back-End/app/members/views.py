from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView
from .serializers import CompleteUserSerializer
from django.core.mail import send_mail
from django.conf import settings
from .utils import generate_email_token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .utils import verify_email_token
from rest_framework import generics, permissions
from .serializers import UserSerializer 
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny

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


# Create a view named VerifyEmailView that inherits from APIView that will respond to http requests
class VerifyEmailView(APIView):
    # Method executed when a GET request is sent to this view
    def get(self, request):
        # Retrieves the token parameter from the URL
        token = request.GET.get('token')
        if not token:
            return Response({"detail": "Token manquant."}, status=status.HTTP_400_BAD_REQUEST)

        email = verify_email_token(token)
        if not email:
            return Response({"detail": "Token invalide ou expiré."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Search for a user in the database with this email
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "Utilisateur non trouvé."}, status=status.HTTP_404_NOT_FOUND)

        if user.is_verified:
            return Response({"detail": "Compte déjà vérifié."})
        
        # Informs that the account is verified
        user.is_verified = True
        # Saves the information in the database
        user.save()
        return Response({"detail": "Email vérifié avec succès."})


# Allows you to reuse all the default login behavior, while customizing it
class CustomLoginView(LoginView): 
    # Override the post method, because login (/auth/login/) is done via a POST request
    def post(self, request, *args, **kwargs):
        # Calls the standard dj-rest-auth login method (LoginView)
        # Handles email/password authentication and returns a response (JWT tokens, etc.)
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            # represents the successfully logged in user.
            user = self.user
        if not user.is_verified: 
            return Response( {'detail': 'Merci de vérifier votre email avant de vous connecter.'}, status=status.HTTP_403_FORBIDDEN ) 
        return response


# Create an API view to see a profile
class UserProfileView(generics.RetrieveAPIView):
    # Define the fields to return to the customer
    serializer_class = UserSerializer
    # Restrict access to logged in users
    permission_classes = [permissions.IsAuthenticated]
    # Force TokenSimple authentication
    authentication_classes = [TokenAuthentication] 

    # Return the logged in user
    def get_object(self):
        return self.request.user


# Create an API view to update a profile
class UpdateProfileView(generics.RetrieveUpdateAPIView):
    # Define the fields to return to the customer
    serializer_class = UserSerializer
    # Restrict access to logged in users
    permission_classes = [permissions.IsAuthenticated]
    # Force TokenSimple authentication
    authentication_classes = [TokenAuthentication] 
    
    # Return the logged in user
    def get_object(self): 
        return self.request.user

# Create an API view to delete profile
class DeleteAccountView(APIView):
    # Restrict access to logged in users
    permission_classes = [permissions.IsAuthenticated]
    # Force TokenSimple authentication
    authentication_classes = [TokenAuthentication]

    # request = the request object containing information about the logged in user, headers, token, etc.
    def delete(self, request):
        # Retrieves the currently logged in user (authenticated via token).
        user = request.user
        # Completely removes the user from the database.
        user.delete()
        # Returns an HTTP response to the frontend
        return Response({"detail": "Compte supprimé avec succès."}, status=status.HTTP_204_NO_CONTENT)
