from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer

class ArticleListAPIView(generics.ListAPIView):
    # Retrieves all articles and sorts them from newest to oldest
    queryset = Article.objects.all().order_by('-publication_date')
    # Specifies the serializer used to convert Article objects to JSON
    serializer_class = ArticleSerializer
