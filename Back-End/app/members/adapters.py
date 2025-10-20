# DefaultAccountAdapter is class provided by django-allauth that handles certain actions related to user accounts, including sending emails
from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings
from allauth.account.utils import user_pk_to_url_str

class FrontendResetAdapter(DefaultAccountAdapter):
    # Method automatically called by Allauth when it needs to send an email
    # template_prefix: The name of the email template to use (for example : account/email/password_reset)
    # email: The recipient's email address
    # context: A dictionary with all the variables to be injected into the email (such as uid, token, etc.)
    def send_mail(self, template_prefix, email, context):
        print("Mon adapter personnalisé est bien utilisé")
        if template_prefix == 'account/email/password_reset':
            user = context.get('user')
            if user:
              uid = context.get('uid') or user_pk_to_url_str(user)
              token = context.get('token')
              # Replaces the value of context['password_reset_url'] with a URL that points to the frontend.
              context['password_reset_url'] = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"
        # Sends the email with the updated context
        super().send_mail(template_prefix, email, context)
