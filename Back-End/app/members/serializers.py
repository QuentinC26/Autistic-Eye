# ModelSerializer is in the serializers module
from rest_framework.serializers import ModelSerializer
from members.models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'first_name', 'last_name', 'age', 'location']
        # Write-only password, which allows the password to never be returned in the API response
        extra_kwargs = {'password': {'write_only': True}}

    # Method to create a new user from an email and password received in a request
    def create(self, validated_data):
        # Create a user with email and additional information
        user = User(
          email=validated_data['email'],
          first_name=validated_data.get('first_name', ''),
          last_name=validated_data.get('last_name', ''),
          age=validated_data.get('age', None),
          location=validated_data.get('location', '')
        )
        # the password is hashed
        user.set_password(validated_data['password'])
        # the user is save in database
        user.save()
        return user
