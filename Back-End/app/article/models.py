from django.db import models
from django.conf import settings

# Defines a Source class that inherits from models.Model
class Source(models.Model):
    # List of fields of the Source class
    name = models.CharField(max_length=50)
    url = models.URLField()

    def __str__(self):
        # Returns a human-readable representation of the object, here the source name
        return self.name

# Defines a Article class that inherits from models.Model
class Article(models.Model):
    # List of fields of the Article class
    title = models.CharField(max_length=100)
    # Description or summary of the article
    description = models.TextField(blank=True)
    link = models.URLField()
    image_url = models.URLField(blank=True, null=True)
    publication_date = models.DateTimeField()
    # The article is linked to a source (for example, the website or organization from which it originated)
    # If the source is deleted, all its articles will be deleted as well (CASCADE)
    source = models.ForeignKey(Source, on_delete=models.CASCADE)

    def __str__(self):
        # Returns a human-readable representation of the object, here the source title
        return self.title

# Defines a Comment class that inherits from models.Model
class Comment(models.Model):
    # Foreign key to an article. Each comment is linked to a specific article.
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='comments')
    # The user who posted the comment
    # If the user is deleted, the comment remains (user becomes NULL)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # others fields
    content = models.TextField()
    # auto_now_add=True = Automatically fill created_at with the current date and time
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        # Text representation of the comment, for example: "alice - Article on autism".
        return f"{self.user.username} - {self.article.title}"
