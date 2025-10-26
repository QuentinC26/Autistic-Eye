# Imports Django's BaseCommand class, which is used to create custom commands that can be executed via manage.py.
from django.core.management.base import BaseCommand
from article.generators import fetch_and_save_articles 

# Creates a new Django command that will have all the basic functionality of a standard Django command using BaseCommand.
class Command(BaseCommand):
    # Short description of the command, displayed when you do python manage.py help or python manage.py –help
    help = 'Retrieves external articles and stores them in the database'

    # Main method that will be executed when you run the command via python manage.py <command_name>
    def handle(self, *args, **kwargs):
        # Call your function to retrieve and save the items to the database.
        fetch_and_save_articles()
        # Displays a console message indicating that the operation was successful.
        self.stdout.write(self.style.SUCCESS('Articles récupérés avec succès.'))
