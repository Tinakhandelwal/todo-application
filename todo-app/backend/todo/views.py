from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import ToDo
from .serializers import ToDoSerializer

class ToDoListCreate(generics.ListCreateAPIView):
    queryset = ToDo.objects.all().order_by('-created_at')
    serializer_class = ToDoSerializer

class ToDoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
