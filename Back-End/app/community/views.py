from rest_framework import viewsets, permissions
from .models import Post
from .models import CommentaryPost
from .serializers import PostSerializer
from .serializers import CommentaryPostSerializer

# Viewsets uses ModelViewSet, which automatically manages CRUD views
class PostViewSet(viewsets.ModelViewSet):
    # Post.objects.all() means: Give me all Post objects in the database.
    queryset = Post.objects.all()
    # Uses PostSerializer to convert objects to JSON and validate the received data
    serializer_class = PostSerializer
    # Requires user to be authenticated to access this view
    permission_classes = [permissions.IsAuthenticated]

    # Everyone can see all posts
    def get_queryset(self):
      return Post.objects.all()

    # Force the author field to be the logged in user to prevent the logged in user from choosing the author
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

# Viewsets uses ModelViewSet, which automatically manages CRUD views
class CommentaryPostViewSet(viewsets.ModelViewSet):
    # CommentaryPost.objects.all() means: Give me all CommentaryPost objects in the database.
    queryset = CommentaryPost.objects.all() 
    # Uses CommentaryPostSerializer to convert objects to JSON and validate the received data
    serializer_class = CommentaryPostSerializer
    # Requires user to be authenticated to access this view
    permission_classes = [permissions.IsAuthenticated]

    # Everyone can see all posts
    def get_queryset(self):
      return CommentaryPost.objects.all()
    
    # Force the author field to be the logged in user to prevent the logged in user from choosing the author
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
