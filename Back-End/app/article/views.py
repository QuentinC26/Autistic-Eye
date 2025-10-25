from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer
from rest_framework.pagination import PageNumberPagination


class ArticlePagination(PageNumberPagination):
  # Each page will contain a maximum of 10 articles
  page_size = 10


class ArticleListAPIView(generics.ListAPIView):
    # Retrieves all articles and sorts them from newest to oldest
    queryset = Article.objects.all().order_by('-publication_date')
    # Specifies the serializer used to convert Article objects to JSON
    serializer_class = ArticleSerializer
    # Uses the custom pagination class defined just before
    pagination_class = ArticlePagination