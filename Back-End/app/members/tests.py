import pytest
from members.models import User

@pytest.mark.django_db
# test for verify the model is works well
def test_member_model():
    member = User.objects.create(first_name="Cindy", last_name="Jackson", age="19", location="New York", email="cindyjackson@gmail.com")
    assert str(member) == "cindyjackson@gmail.com"

