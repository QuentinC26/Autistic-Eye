from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    # Indicates which template it should use and which fields to include
    class Meta:
        # Tells the serializer that the associated model is Article
        model = Article
        # Specifies the model fields that you want to include in the serialization
        fields = ['id', 'title', 'description', 'link', 'image_url', 'publication_date']
