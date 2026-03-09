import pytest
from members.models import User
from rest_framework.test import APIClient

@pytest.mark.django_db
# test for verify the model is works well
def test_member_model():
    member = User.objects.create(first_name="Cindy", last_name="Jackson", age="19", location="New York", email="cindyjackson@gmail.com")
    member.set_password("jesuistropbelle")
    member.save()
    assert str(member) == "cindyjackson@gmail.com"

@pytest.mark.django_db
# test for verify the connexion in the application is works well
def test_member_login(client):
    member = User.objects.create(first_name="Alain", last_name="Solis", age="29", location="Paris", email="alainsolis@gmail.com")
    member.set_password("expertcomptabledu29786")
    member.save()
    response = client.post(
        "/members/auth/login/", ({
            "email": "alainsolis@gmail.com",
            "password": "expertcomptabledu29786"
        }),
        content_type="application/json"
    )
    assert response.status_code == 200

@pytest.mark.django_db
# test for delete account is works well
def test_delete_user():
    client = APIClient()
    member = User.objects.create(first_name="Albert", last_name="Dixon", age="36", location="Lille", email="albertdixon@gmail.com")
    member.set_password("bulbizarredu89")
    member.save()
    client.force_authenticate(user=member)
    response = client.delete("/members/profile/delete/")
    assert response.status_code == 204
