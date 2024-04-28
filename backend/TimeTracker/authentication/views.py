from django.shortcuts import render

# Create your views here.

from .serializers import RegisterSerializer, UsersSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from permissions.PermissionViewSets import CustomPermissionViewSet


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class UsersView(CustomPermissionViewSet):
    permission_classes_by_action ={
        'list': [IsAuthenticated],
    }

    def list(self, request):
        queryset = User.objects.all()
        serializer = UsersSerializer(queryset, many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)

