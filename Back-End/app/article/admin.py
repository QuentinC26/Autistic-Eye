from django.contrib import admin
from django.utils.text import Truncator
from .models import Article, Source

# Save the Source template with this configuration
@admin.register(Source)
class SourceAdmin(admin.ModelAdmin):
    # Columns visible in the source list.
    list_display = ('name', 'url', 'created_at')
    # Allows you to search for a source by name.
    search_fields = ('name',)

# # Save the Article template with this configuration
@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    # Columns visible in the article list.
    list_display = ('title', 'source', 'publication_date', 'short_description')
    # Add filters on the right side (by source and date)
    list_filter = ('source', 'publication_date')
    # Allows you to search for a source by title, and description.
    search_fields = ('title', 'description')
    # Shows the most recent articles first.
    ordering = ('-publication_date',)
    # Prevents modification of certain sensitive data (here the publication date).
    readonly_fields = ('publication_date',)

    # Generates an abbreviated summary of the description to display in the admin interface
    def short_description(self, obj):
        # Limit text length to 100 characters
        return Truncator(obj.description).chars(100)
    
    # Gives a custom name to the column in the item list.
    short_description.short_description = "Description"
