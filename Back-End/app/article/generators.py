# Imports the library to read and parse the RSS feed
import feedparser
from datetime import datetime
from .models import Article, Source
from django.utils.timezone import make_aware

# Store the URL of your custom RSS feed in a variable
RSS_FEED_URL = { 
    "Ministry of Health" : "https://rss.app/feeds/HYfL8ByTfnSKjNVY.xml",
    "Autism France" : "https://rss.app/feeds/QAeiCiDxsgPoapsI.xml",
}

# Allows you to define the keywords that must appear in the title or description for the article to be saved
KEYWORDS = ["autisme", "neurodiversité", "handicap", "inclusion", "trouble du spectre", "accompagnement", "accessibilité"]

# Performs all the recovery and recording work
def fetch_and_save_articles():
    # Loop that allows you to browse the dictionary
    for source_name, url in RSS_FEED_URL.items():  
      # Downloads the RSS feed from the provided link, then parses it into an easy-to-manipulate Python object.
      rss_data = feedparser.parse(url)
      # Retrieves the Source object corresponding to the RSS feed site in the database. If this source doesn't exist, it is created.
      # source is therefore the object to use to link articles.
      # created is a boolean indicating whether the source has been created or not.
      source, created = Source.objects.get_or_create(name=source_name, url=url)

      # Loop through all entry in rss_date.entries
      for entry in rss_data.entries:
          # # Retrieves and lowercases the article title and description to avoid case.
          title = entry.title.lower()
          description = entry.get("summary", "").lower()

          # Variable that contains the result of the KEYWOORDS check, before the check it is equal to False.
          contains_keyword = False
          # Browse the keywords found in KEYWORD
          for keyword in KEYWORDS:
              # If the keyword is found in the title or description.
              if keyword in title or keyword in description:
                # contains_keywoord becomes True as it found a keyword from KEYWOORDS
                contains_keyword = True
                # No need to check other keywords, we're out of the loop.
                break
        
          # If the article does not contain any interesting keywords, it is not saved and the loop moves on to the next article.
          if not contains_keyword:
            continue

          if Article.objects.filter(link=entry.link).exists():
            # If an article with this link already exists in the database, we move on to the next one.
            continue

          # Allows you to have a default value before filling it in
          pub_date = None
          # If this article contains a publication date, we try to read it
          if 'published' in entry:
              try:
                  # Adds the time zone to the date so that Django accepts it
                  pub_date = make_aware(datetime(*entry.published_parsed[:6]))
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
