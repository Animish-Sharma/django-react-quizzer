from django.core.paginator import Paginator
from .models import  Question, Result, Test, UserAnswers
from rest_framework.generics import ListAPIView,RetrieveAPIView
from rest_framework.views import APIView
from rest_framework import permissions
from .serializers import QuestionSerializer, ResultSerializer, TestSerializer
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 20
    page_query_param = 'page'

class TestListView(ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = LargeResultsSetPagination
    serializer_class = TestSerializer
    def get_queryset(self):
        test = Test.objects.exclude(users_test = self.request.user).order_by('-id')
        return test

class ResultListView(ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ResultSerializer
    def get_queryset(self):
        query = Result.objects.filter(user = self.request.user).order_by("-id")
        return query
class ResultDetailView(RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ResultSerializer
    def get_queryset(self):
        query = Result.objects.filter(user = self.request.user)
        return query

class TestDetailView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TestSerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
        tests =  Test.objects.exclude(users_test = self.request.user)
        for test in tests:
            test.save()
        return tests
    lookup_field="slug"


class TestResultsView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request,format=None):
        data=self.request.data
        slug = data["slug"]
        result = data["result"]

        test = Test.objects.get(slug=slug)
        result_user = Result.objects.create(user=self.request.user,test=test,total_marks=test.total_marks)
        
        count = 0
        for question in test.questions.all():
            for ques in result:
               if (question.question == ques):
                   #*! We have to create UserAnswers instance despite whether the answer is correct or incorrect.
                    
                    UserAnswers.objects.create(user=self.request.user,test=test,question=question,user_answer=result[ques],result=result_user)
                    
                    if(question.answer == result[ques]):
                        count += question.marks

        
        result_user.obtained_marks = count
        result_user.save()

        return Response({ "success":"Success" })