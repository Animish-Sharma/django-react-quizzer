from .models import Question, Result, Test, UserAnswers
from django.contrib import admin

# Register your models here.
admin.site.register(Question)
admin.site.register(Test)
admin.site.register(Result)
admin.site.register(UserAnswers)