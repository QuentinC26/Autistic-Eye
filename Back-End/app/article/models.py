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
    title = models.CharField(max_length=2000)
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
