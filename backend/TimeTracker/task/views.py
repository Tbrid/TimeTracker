from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from permissions.PermissionViewSets import CustomPermissionViewSet
from rest_framework import status
from rest_framework.response import Response
from .models import *
# Create your views here.

class TaskView(CustomPermissionViewSet):
    permission_classes_by_action ={
        'list': [IsAuthenticated],
        'retrieve': [IsAuthenticated],
        'create': [IsAuthenticated],
    }
    
    def list(self, request, user_pk):
        return Response(status=status.HTTP_200_OK)
    
    def retrieve(self, request, user_pk, pk):
        return Response(status=status.HTTP_200_OK)
    
    def create(self, request, user_pk):
        return Response(status=status.HTTP_200_OK)