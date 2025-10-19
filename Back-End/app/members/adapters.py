# DefaultAccountAdapter is class provided by django-allauth that handles certain actions related to user accounts, including sending emails
from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings

class FrontendResetAdapter(DefaultAccountAdapter):
    # Method automatically called by Allauth when it needs to send an email
    # template_prefix: The name of the email template to use (for example : account/email/password_reset)
    # email: The recipient's email address
    # context: A dictionary with all the variables to be injected into the email (such as uid, token, etc.)
    def send_mail(self, template_prefix, email, context):
        # checks if the password_reset_url key already exists in the context
        if 'password_reset_url' in context:
            uid = context.get('uid')
            token = context.get('token')
            # Replaces the value of context['password_reset_url'] with a URL that points to the frontend.
            context['password_reset_url'] = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"
        # Sends the email with the updated context
        super().send_mail(template_prefix, email, context)
