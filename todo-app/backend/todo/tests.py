# Create your tests here.
from django.test import TestCase
from django.urls import reverse
from todo.models import ToDo
from rest_framework import status
from rest_framework.test import APITestCase

class TodoAPITests(APITestCase):

    def test_create_todo(self):
        """
        Ensure we can create a new To-Do item via the API.
        """
        url = reverse("todo-list-create")
        data = {
            "title": "Test To-Do",
            "body": "This is a test to-do item.",
            "completed": False
        }

        response = self.client.post(url, data, format="json")

        # Check if the request was successful (HTTP 201 Created)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Verify the To-Do item was created in the database
        self.assertEqual(ToDo.objects.count(), 1)
        self.assertEqual(ToDo.objects.get().title, "Test To-Do")
