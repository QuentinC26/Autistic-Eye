from rest_framework import viewsets, permissions
from .models import Post
from .models import CommentaryPost
from .serializers import PostSerializer
from .serializers import CommentaryPostSerializer
from .permission import IsOwnerOrReadOnly
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer
from rest_framework.pagination import PageNumberPagination


class ArticlePagination(PageNumberPagination):
  # Each page will contain a maximum of 10 articles
  page_size = 10


# Viewsets uses ModelViewSet, which automatically manages CRUD views
class PostViewSet(viewsets.ModelViewSet):
    # Post.objects.all() means: Give me all Post objects in the database.
    queryset = Post.objects.all() 
    # Uses PostSerializer to convert objects to JSON and validate the received data
    serializer_class = PostSerializer
    # Uses the custom pagination class defined just before
    pagination_class = ArticlePagination
    
    # Manages the visibility of posts on the home page based on login or logout
    def get_permissions(self):
      if self.request.user.is_authenticated:
          # Only logged in users can access.
          # A user can only modify or delete their own objects.
          return [IsAuthenticated(), IsOwnerOrReadOnly()]
      else:
          return [AllowAny()]
      
    # Defines the get_queryset method to customize the retrieval of objects to return
    def get_queryset(self):
        # Gets the 'limit' parameter in the URL
        limit = self.request.query_params.get('limit')

        # Used to handle the secure retrieval and conversion of the limit parameter from the URL
        if limit is not None:
          try:
            # Attempts to convert the value of 'limit' (which is a string) to an integer
            limit = int(limit) 
          except ValueError:
            # If the conversion fails (for example 'limit' is not a number), set 'limit' to None to ignore the limit.
            limit = None 
        else:
          # Set limit to None if limit was already None
          limit = None
        if limit:
            # If 'limit' exists, return the latest posts by descending creation date
            return self.queryset.order_by('-created_at')[:limit]
        # Otherwise, return the entire default queryset
        return self.queryset
    
    # Force the author field to be the logged in user to prevent the logged in user from choosing the author
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
   

# Viewsets uses ModelViewSet, which automatically manages CRUD views
class CommentaryPostViewSet(viewsets.ModelViewSet):
    # CommentaryPost.objects.all() means: Give me all Post objects in the database.
    queryset = CommentaryPost.objects.all()
    # Uses PostSerializer to convert objects to JSON and validate the received data
    serializer_class = CommentaryPostSerializer
    # Only logged in users can access.
    # A user can only modify or delete their own objects.
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    # Everyone can see all posts
    def get_queryset(self):
      return CommentaryPost.objects.all()

    # Force the author field to be the logged in user to prevent the logged in user from choosing the author
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

 
# Defines a ListAPIView based view that will be used to list posts.
class PostListView(ListAPIView):
  # Indicates that this view will use PostSerializer to transform posts into JSON
  serializer_class = PostSerializer
  # Gives permission to anyone (even if they are not logged in) to call this function
  permission_classes = [AllowAny]
  # To avoid pagination on the home page
  pagination_class = None

  # Returns the list of posts to display on the home page
  def get_queryset(self):
    # Retrieves the logged in user if authenticated, otherwise sets user to None
    if self.request.user.is_authenticated:
      user = self.request.user
    else:
       user = None
    # If a user is logged in, they will see the 5 most recent posts
    if user:
        posts = Post.objects.all().order_by('-created_at')[:3]
    # If a user is logged out, they will see the most recent posts
    else:
        posts = Post.objects.all().order_by('-created_at')[:1]
    return posts
