from django.urls import path
from .views import ToDoListCreate, ToDoRetrieveUpdateDestroy

urlpatterns = [
    path('todos/', ToDoListCreate.as_view(), name='todo-list-create'),
    path('todos/<int:pk>/', ToDoRetrieveUpdateDestroy.as_view(), name='todo-detail'),
]