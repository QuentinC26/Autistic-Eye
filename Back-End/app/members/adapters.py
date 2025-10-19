# DefaultAccountAdapter is class provided by django-allauth that handles certain actions related to user accounts, including sending emails
from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings
from allauth.account.utils import user_pk_to_url_str

class FrontendResetAdapter(DefaultAccountAdapter):
    # Method automatically called by Allauth when a user requests a password reset
    def send_password_reset_mail(self, request, user):
        # Generates a secure token for reset
        token = self.token_generator.make_token(user)
        # Transforms user ID into URL-safe format
        uid = user_pk_to_url_str(user)
        # Build the link that will point to your React page.
        reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"
        # Context is a Python dictionary containing all the information to inject into the template of the email you send to the user
        # Prepare the data (context) that the email template will use
        context = {
            'user': user,
            'password_reset_url': reset_url,
        }
        # Send the email with the default Allauth template, but using our modified link.
        self.send_mail('account/email/password_reset', user.email, context)

