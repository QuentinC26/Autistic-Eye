# Imports Django's tools for signing (securely encrypting) and verifying data.
# TimestampSigner = Add a signature + timestamp (date and time an event occurred) to a message
# BadSignature = An error is triggered if someone tries to change the token.
# SignatureExpired = Exception thrown if the token is too old (expired)
from django.core.signing import TimestampSigner, BadSignature, SignatureExpired

sign_with_timestamp = TimestampSigner()

# Function that generates a secure token for the email address
def generate_email_token(email):
    # sign() is a method provided by Django via the TimestampSigner object that is used to create a secure token from data.
    return sign_with_timestamp.sign(email)

# Function to validate a token received in the URL
# The max_age is token validity period and is in seconds, here: 24 hours (60 sec * 60 min * 24 h)
def verify_email_token(token, max_age=60*60*24):
    try:
        # Checks that the token has not been modified
        email = sign_with_timestamp.unsign(token, max_age=max_age)
        return email
    except (BadSignature, SignatureExpired):
        return None
