# Import the signal emitted by allauth
from allauth.account.signals import email_confirmed
# Import the receiver decorator, which allows you to connect a function (called a "receiver") to a signal.
from django.dispatch import receiver

# Call this function when the email is confirmed
@receiver(email_confirmed)
# Automatically executed when a user confirms their email
# request: The HttpRequest object associated with the action.
# email_address: An object representing the confirmed email address.
# **kwargs: Allows you to capture any additional arguments provided by the signal.
def email_confirmed_(request, email_address, **kwargs):
    # # Retrieves the User object associated with this confirmed email address.
    user = email_address.user
    # Check that the user is not yet marked as verified (is_verified == False).
    if not user.is_verified:
        # If it is not already done, we set is_verified to True.
        user.is_verified = True
        # Saves the user to the database (user.save()).
        user.save()
