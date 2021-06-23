from rest_framework.generics import UpdateAPIView
from .views import LoginView, SignUpView, UpdateView
from django.urls import path

app_name = "accounts"

urlpatterns = [
    path("signup/",SignUpView.as_view()),
    path("login/",LoginView.as_view()),
    path("update/",UpdateView.as_view()),
]