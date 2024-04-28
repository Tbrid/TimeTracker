from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from permissions.PermissionViewSets import CustomPermissionViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from .models import *
from django.db.models import Sum
from .serializers import *
# Create your views here.

class TaskView(CustomPermissionViewSet):
    permission_classes_by_action ={
        'list': [IsAuthenticated],
        'retrieve': [IsAuthenticated],
        'create': [IsAuthenticated],
    }
    
    def list(self, request, user_pk):
        start_time = self.request.query_params.get('start_time', None)

        queryset = Task.objects.filter(user_id=user_pk)
        if start_time:
            queryset = queryset.filter(start_time__gte=start_time)
        total_hours_for_projects = queryset.values('project').order_by('project').annotate(total_hours=Sum('hours'))
        task_serializer = TaskSerializer(queryset, many=True)
        return Response(status=status.HTTP_200_OK, data={
            'tasks': task_serializer.data, 
            'totals': total_hours_for_projects,
            })
    
    def retrieve(self, request, user_pk, pk):
        queryset = Task.objects.filter(user_id=user_pk, id=pk)
        task = get_object_or_404(queryset=queryset, id=pk)
        serializer = TaskSerializer(task)
        return Response(status=status.HTTP_200_OK, data=serializer.data)
        
    
    def create(self, request, user_pk):
        serializer = TaskSerializer(data=request.data, context={'user_id': user_pk})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK, data=serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
