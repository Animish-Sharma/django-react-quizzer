from .views import ResultDetailView, ResultListView, TestDetailView, TestListView,TestResultsView
from django.urls import path

app_name = "accounts"

urlpatterns = [
    path("tests/",TestListView.as_view()),
    path("test/<slug>/",TestDetailView.as_view()),
    path("results/",ResultListView.as_view()),
    path("results/<pk>/",ResultDetailView.as_view()),
    path("submit/test/",TestResultsView.as_view())
]