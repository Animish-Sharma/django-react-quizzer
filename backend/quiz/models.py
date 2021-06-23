from django.db import models
from django.conf import settings
from django.template.defaultfilters import slugify
# Create your models here.

class Question(models.Model):

    ANSWER_CHOICE = (
        ('A','A'),
        ('B','B'),
        ('C','C'),
        ("D",'D'),
    )

    question = models.CharField(max_length=1000)
    option_a = models.CharField(max_length=500)
    option_b = models.CharField(max_length=500)
    option_c = models.CharField(max_length=500)
    option_d = models.CharField(max_length=500)
    marks = models.PositiveIntegerField(default = 1)
    image = models.ImageField(blank=True,null=True,upload_to="question",help_text="If any")
    answer = models.CharField(max_length=1,choices=ANSWER_CHOICE,default= 'A')


    def __str__(self):
        return f"{self.question}"


class Test(models.Model):
    name = models.CharField(max_length=500)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    questions=models.ManyToManyField(Question)
    total_marks = models.PositiveIntegerField(blank=True,null=True)
    total_questions = models.PositiveIntegerField(blank=True,null=True)
    users_test = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True,null=True,related_name="test_users")
    slug = models.SlugField(max_length=400,blank=True,null=True)
    def save(self, *args, **kwargs):
        copy_slug = slugify(self.name)
        queryset = Test.objects.filter(slug__iexact=copy_slug).count()
        count = 1
        slug = copy_slug

        while(queryset):
            query = Test.objects.get(slug__iexact= slug)
            if(query.id == self.id):
                break
            slug = copy_slug + "-" + str(count)
            count += 1
            queryset = Test.objects.get(slug__iexact=slug).count()

        self.slug = slug
        super(Test, self).save(*args, **kwargs)


    def __str__(self):
        return self.name

    def get_questions(self):
        return self.questions.all()

    def get_all_questions(self):
        return self.questions.all().count()



class UserAnswers(models.Model):
    ANSWER_CHOICE = (
        ('A','A'),
        ('B','B'),
        ('C','C'),
        ("D",'D'),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    test = models.ForeignKey(Test,on_delete=models.CASCADE)
    question = models.ForeignKey(Question,on_delete=models.CASCADE)
    user_answer = models.CharField(max_length=2,choices=ANSWER_CHOICE)
    result = models.ForeignKey("Result",on_delete=models.CASCADE,related_name="answers",blank=True,null=True)
    answer = models.CharField(max_length=2,choices=ANSWER_CHOICE,null=True,blank=True)


    def __str__(self):
        return f"User Response of {self.test} in {self.question}"

class Result(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    test = models.ForeignKey(Test,on_delete = models.CASCADE)
    obtained_marks = models.IntegerField(null=True,blank=True)
    total_marks = models.IntegerField(null=True,blank=True)
    response = models.ManyToManyField(UserAnswers,blank=True,null=True,related_name="user_response")

    def save(self, *args, **kwargs):
        self.total_marks = self.test.total_marks
        super(Result, self).save(*args, **kwargs)
    
    def __str__(self):
        return f"Result of {self.user} in {self.test.name} "