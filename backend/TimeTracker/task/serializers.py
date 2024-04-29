from rest_framework import serializers
from django.contrib.auth.models import User
from datetime import datetime
from .models import *

class TaskSerializer(serializers.ModelSerializer):

    user = serializers.CharField(required=False)
    start_time = serializers.DateTimeField(required=False)
    hours = serializers.IntegerField(required=True)
    description = serializers.CharField(required=True)
    project = serializers.CharField(required=True)

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
        user = User.objects.get(id=self.context['user_id'])

        hours = validated_data['hours']
        description = validated_data['description']
        project = validated_data['project']

        created_task = Task.objects.create(
            user=user,
            start_time=datetime.now(),  # auto save current time
            hours=hours,
            description=description,
            project=project
        )

        return created_task