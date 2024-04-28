from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = (
            'id',
            'user',
            'start_time',
            'hours',
            'description',
            'project',
        )    

    def create(self, validated_data):
        user = User.objects.get(id=validated_data['user_id'])
        return