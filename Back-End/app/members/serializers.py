# ModelSerializer is in the serializers module
from rest_framework.serializers import ModelSerializer
from members.models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
