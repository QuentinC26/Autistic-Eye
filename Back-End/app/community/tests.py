from django.db import models
from members.models import User
from community.models import Post
import pytest
from rest_framework.test import APIClient

@pytest.mark.django_db
# test for check the creation of post is works well
def test_create_post():
    client=APIClient()
    member = User.objects.create(
        first_name="Christophe",
        last_name="Lalanne",
        birth_date="1999-05-01", 
        location="Lille", 
        email="christophelalanne@gmail.com"
    )

    member.set_password("bulbizarredu89")
    member.save()
    client.force_authenticate(user=member)

    post = Post.objects.create(
        author=member,
        title="Un renouveau",
        subject="Autre",
        content="bla bla bla",
        created_at="12/04/2026"
    )

    assert post.author == member
    assert post.title == "Un renouveau"

@pytest.mark.django_db
# test for check the deletation of post is works well
def test_delete_post():
    client=APIClient()
    member = User.objects.create(
        first_name="Christophe",
        last_name="Lalanne",
        birth_date="1999-05-01", 
        location="Lille", 
        email="christophelalanne@gmail.com"
    )

    member.set_password("bulbizarredu89")
    member.save()
    client.force_authenticate(user=member)

    post = Post.objects.create(
        author=member,
        title="Un renouveau",
        subject="Autre",
        content="bla bla bla",
        created_at="12/04/2026"
    )

    response = client.delete(f"/api/community/posts/{post.id}/")
    assert response.status_code == 204

