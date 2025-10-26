from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny


class ArticlePagination(PageNumberPagination):
  # Each page will contain a maximum of 10 articles
  page_size = 10


class ArticleListAPIView(generics.ListAPIView):
    # Specifies the serializer used to convert Article objects to JSON
    serializer_class = ArticleSerializer
    # Uses the custom pagination class defined just before
    pagination_class = ArticlePagination
    # Allows reading without login
    permission_classes = [AllowAny]

    def get_queryset(self):
      # Retrieves all articles and sorts them from newest to oldest
      queryset = Article.objects.all().order_by('-publication_date')
      # Check if there is a 'limit' parameter in the URL to limit the number of items returned.
      limit = self.request.query_params.get('limit')

      # Checks that 'limit' is a number, then limits the queryset to the requested number of items
      if limit is not None and limit.isdigit():
          queryset = queryset[:int(limit)]
      
      return queryset
