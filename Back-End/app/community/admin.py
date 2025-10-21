from django.contrib import admin
from .models import Post, CommentaryPost

# Decorator that allows you to bind the `Post` model to a custom configuration class for the admin
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    # Defines the columns displayed in the Post objects list in the admin
    list_display = ('id', 'title', 'author', 'created_at')
    # Allows you to search by title and author__username.
    # title = local field, author__username = User model field via relationship
    search_fields = ('title', 'author__username')
    # Add a filter to the right in the admin interface
    list_filter = ('created_at',)

# Decorator that allows you to bind the `CommentaryPost` model to a custom configuration class for the admin
@admin.register(CommentaryPost)
class CommentaryPostAdmin(admin.ModelAdmin):
    # Defines the columns displayed in the CommunityPost objects list in the admin
    list_display = ('id', 'post', 'author', 'created_at')
    # Allows you to search by title and author__username.
    # post_title = local field, author__username = User model field via relationship
    search_fields = ('post__title', 'author__username')
    # Add a filter to the right in the admin interface
    list_filter = ('created_at',)
