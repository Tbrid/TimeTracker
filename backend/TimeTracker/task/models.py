from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Task(models.Model):
    id: int
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_time = models.DateTimeField(auto_now=False, auto_now_add=False) # keep auto_now false to make the field edible
    hours = models.IntegerField(default=1)
    description = models.CharField(max_length=500, blank=True, null=True, default="")
    project = models.CharField(max_length=50)

    class Meta:
        ordering = ('id',)
    
    def __str__(self) -> str:
        return f'{self.id}'

