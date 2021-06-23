from .models import  Result, Test, UserAnswers
from django.db.models.signals import m2m_changed, post_delete, post_save
from django.dispatch import receiver

@receiver(m2m_changed,sender=Test.questions.through)
def calculate_total_marks(sender,instance,action,**kwargs):
    total_marks=0
    print("action",action)

    if action == 'post_add' or action == 'post_remove':
        for item in instance.get_questions():
            total_marks += item.marks

    instance.total_marks = total_marks
    instance.save()

@receiver(m2m_changed,sender=Test.questions.through)
def calculate_total_questions(sender,instance,action,**kwargs):
    total_questions=0
    print("action",action)

    if action == 'post_add' or action == 'post_remove':
        for item in range(1,instance.get_all_questions() + 1):
            total_questions = item
            print("item",item)

    instance.total_questions = total_questions
    instance.save()

@receiver(post_save,sender = Result)
def add_user_to_test_user_list(sender,instance,created,**kwargs):
    if created:
        instance.test.users_test.add(instance.user)

@receiver(post_delete,sender = Result)
def remove_user_from_list(sender,instance,**kwargs):
    instance.test.users_test.remove(instance.user)

@receiver(post_save,sender = UserAnswers)
def actual_answer(sender,instance,created,**kwargs):
    if created:
        instance.answer = instance.question.answer
        instance.save()

@receiver(post_save,sender=UserAnswers)
def add_response(sender,instance,created,**kwargs):
    if created:
        instance.result.response.add(instance)
        instance.save()
