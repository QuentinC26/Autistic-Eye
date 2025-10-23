# Imports the library to read and parse the RSS feed
import feedparser
from datetime import datetime
from .models import Article, Source

# Store the URL of your custom RSS feed in a variable
RSS_FEED_URL = "https://rss.app/feeds/HYfL8ByTfnSKjNVY.xml"

# Performs all the recovery and recording work
def fetch_and_save_articles():
    # Downloads the RSS feed from the provided link, then parses it into an easy-to-manipulate Python object.
    rss_data = feedparser.parse(RSS_FEED_URL)

    # Retrieves the Source object corresponding to the RSS feed site in the database. If this source doesn't exist, it is created.
    # source is therefore the object to use to link articles.
    # created is a boolean indicating whether the source has been created or not.
    source, created = Source.objects.get_or_create(name="Santé.gouv.fr", url=RSS_FEED_URL)

    # Loop through all entry in rss_date.entries
    for entry in rss_data.entries:
        # This check prevents the same article from being added multiple times. 
        if Article.objects.filter(link=entry.link).exists():
            # If an article with this link already exists in the database, we move on to the next one.
            continue

        # Allows you to have a default value before filling it in
        pub_date = None
        # If this article contains a publication date, we try to read it
        if 'published' in entry:
            try:
                # Allows you to have a real date and time that Django can use to save it in the database.
                pub_date = datetime(*entry.published_parsed[:6])
            except Exception:
                # If we were unable to read the real date, we enter the current date
                pub_date = datetime.now()
        else:
            # If we were unable to read the real date, we enter the current date
            pub_date = datetime.now()

        # Creates a new Article object with the retrieved data
        Article.objects.create(
            title=entry.title,
            description=entry.get('summary', ''),
            link=entry.link,
            publication_date=pub_date,
            source=source
        )
