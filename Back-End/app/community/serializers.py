from rest_framework import serializers
from .models import Post, CommentaryPost
from members.serializers import UserSerializer
class PostSerializer(serializers.ModelSerializer):
    # authors is equal to the data in UserSerializers
    author = UserSerializer(read_only=True)
    # Used to configure the serializer
    class Meta:
        model = Post
        # Serialize all model fields
        fields = '__all__'

class CommentaryPostSerializer(serializers.ModelSerializer):
    # authors is equal to the data in UserSerializers
    author = UserSerializer(read_only=True)
    # Used to configure the serializer
    class Meta:
        model = CommentaryPost
        # Serialize all model fields
        fields = '__all__' 
