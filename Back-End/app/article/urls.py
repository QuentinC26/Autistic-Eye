from django.urls import path
from .views import ArticleListAPIView

# # Defines existing URL links in the application.
urlpatterns = [
  path('api/article/', ArticleListAPIView.as_view(), name='api_articles'),
]
