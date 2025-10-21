from django.db import models
from members.models import User

# The basic template for any post
class Post(models.Model):
    # The user can choose a category for their post based on its content...
    # ...If the post is about their own experience, it will be categorized as "Sharing Experiences."
    SUBJECT_OF_POSTS = [
        ('experience', 'Partage d’expérience'),
        ('question', 'Demande d’aide'),
        ('poll', 'Sondage'),
        ('proposal', 'Proposition'),
        ('other', 'Autre'),
    ]
   
    # ForeignKey(User): Links each post to a user
    # on_delete=SET_NULL: If the user is deleted, the author field is set to NULL
    # null=True: The field can be empty in the database
    # blank=True: The field can be empty in forms
    # related_name='posts': Allows you to run user.posts.all() to view their posts
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='posts')
    title = models.CharField(max_length=70)
    subject = models.CharField(max_length=20, choices=SUBJECT_OF_POSTS, default='other')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
      return self.title

# The basic template for any post
class CommentaryPost(models.Model):
    # related_name='commentaries': Allows you to run user.commentary.all() to view their posts
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='commentaries')
    post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True, blank=True, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
      if self.author:
        return f"Commentaire de {self.author.username}"
      return "Commentaire d’un utilisateur supprimé"
