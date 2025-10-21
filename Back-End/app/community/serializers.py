from rest_framework import serializers
from .models import Post, CommentaryPost

class PostSerializer(serializers.ModelSerializer):
    # Used to configure the serializer
    class Meta:
        model = Post
        # Serialize all model fields
        fields = '__all__'

class CommentaryPostSerializer(serializers.ModelSerializer):
    # Used to configure the serializer
    class Meta:
        model = CommentaryPost
        # Serialize all model fields
        fields = '__all__' 
