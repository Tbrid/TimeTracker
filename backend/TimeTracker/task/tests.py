
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from .models import *
from datetime import datetime

# Create your tests here.

BASE_URL = "http://localhost:8000"

class TaskTestCase(APITestCase):

    def setUp(self) -> None:
        self.user1 = User.objects.create_user(
            username='testuser1',
            email='testuser1@hotmail.com',
            password='Test@123',
            first_name='test',
            last_name='user1',
        )

        self.token1 = Token.objects.create(user=self.user1)

        self.user2 = User.objects.create_user(
            username='testuser2',
            email='testuser2@hotmail.com',
            password='Test@123',
            first_name='test',
            last_name='user2',
        )

        self.token2 = Token.objects.create(user=self.user2)


    def test_users_see_only_their_own_tasks(self):
        Task.objects.create(user=self.user1, start_time=datetime.now(), hours=1, description='Task 1 for user1', project='P1')
        Task.objects.create(user=self.user2, start_time=datetime.now(), hours=1, description='Task 1 for user2', project='P2')
        Task.objects.create(user=self.user2, start_time=datetime.now(), hours=2, description='Task 2 for user2', project='P2')
        client = APIClient()
        client.force_authenticate(user=self.user1, token=self.token1)
        url1 = f'{BASE_URL}/user_tasks/{self.user1.id}/tasks/'
        url2 = f'{BASE_URL}/user_tasks/{self.user2.id}/tasks/'
        tasks_for_user1 = client.get(url1)
        client.force_authenticate(user=self.user2, token=self.token2)
        tasks_for_user2 = client.get(url2)
        self.assertEqual(tasks_for_user1.status_code, status.HTTP_200_OK)
        self.assertEqual(tasks_for_user2.status_code, status.HTTP_200_OK)
        self.assertEqual(len(tasks_for_user1.data), 1)
        self.assertEqual(len(tasks_for_user2.data), 2)

    def test_user_able_to_create_task(self):
        client = APIClient()
        client.force_authenticate(user=self.user1, token=self.token1)
        task = {
            'user_id': self.user1.id,
            'start_time': datetime.now().strftime('%d/%m/%Y, %H:%M:%S'),
            'hours': 18,
            'description': 'Test',
            'project': 'P2'
        }
        url = f'{BASE_URL}/user_tasks/{self.user1.id}/tasks/'
        response = client.post(url, data=task)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        created_task = Task.objects.get(user_id=self.user1.id, hours=18)
        self.assertIsNotNone(created_task)