from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
# I retrieve the basic registration form (with email + password) provided by dj-rest-auth, to modify or reuse it.
from dj_rest_auth.registration.serializers import RegisterSerializer
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

# class for save first_name, last_name, age and location in the database
class CompleteUserSerializer(RegisterSerializer):
    # the fields that must be added to the basic one
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    age = serializers.IntegerField(required=False)
    location = serializers.CharField(required=False)

    # Save the user with the new fields
    def save(self, request):
      # create User with email and password
      user = super().save(request)
      user.first_name = self.validated_data.get('first_name', '')
      user.last_name = self.validated_data.get('last_name', '')
      user.age = self.validated_data.get('age', None)
      user.location = self.validated_data.get('location', '')
      user.save()
      return user
    
    # Method to update a user's data
    # Instance is the already existing object of your User model that you want to update
    def update(self, instance, validated_data):
      # Prohibition on changing email and password
      validated_data.pop('email', None)
      validated_data.pop('password', None)

      # Data that the user can modify
      instance.first_name = validated_data.get('first_name', instance.first_name)
      instance.last_name = validated_data.get('last_name', instance.last_name)
      instance.age = validated_data.get('age', instance.age)
      instance.location = validated_data.get('location', instance.location)
      instance.save()
      return instance
