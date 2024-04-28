from django.urls import include, path
from rest_framework_nested import routers
from . import views
router = routers.DefaultRouter()


router.register(r'(?P<user_pk>[^/.]+)/tasks', views.TaskView, basename='tasks')

urlpatterns = [
    path('', include(router.urls)),
]
