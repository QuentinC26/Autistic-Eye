from rest_framework import viewsets, permissions
from .models import Post
from .models import CommentaryPost
from .serializers import PostSerializer
from .serializers import CommentaryPostSerializer
from .permission import IsOwnerOrReadOnly
from rest_framework.generics import ListAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer

# Viewsets uses ModelViewSet, which automatically manages CRUD views
class PostViewSet(viewsets.ModelViewSet):
    # Post.objects.all() means: Give me all Post objects in the database.
    queryset = Post.objects.all()
    # Uses PostSerializer to convert objects to JSON and validate the received data
    serializer_class = PostSerializer
    # Only logged in users can access.
    # A user can only modify or delete their own objects.
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

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

  # Declares a recent_posts function that takes the received HTTP request as a parameter
  def recent_posts(request):
    # Retrieves the logged in user if authenticated, otherwise sets user to None
    if request.user.is_authenticated:
      user = request.user
    else:
       user = None
    # If a user is logged in, they will see the 5 most recent posts
    if user:
        posts = Post.objects.all().order_by('-created_at')[:5]
    # If a user is logged out, they will see the most recent posts
    else:
        posts = Post.objects.all().order_by('-created_at')[:1]
    # Transforms the list of retrieved posts into JSON via the serializer, many=True means it is a list of objects
    serializer = PostSerializer(posts, many=True)
    # Returns the HTTP response containing the serialized posts in JSON format
    return Response(serializer.data)
  