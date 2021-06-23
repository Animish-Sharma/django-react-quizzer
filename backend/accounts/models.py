from django.db import models
from django.db.models import query
from django.template.defaultfilters import slugify
import random
# Create your models here.
class UserAccount(models.Model):
    first_name = models.CharField(max_length=300)
    last_name = models.CharField(max_length=300)
    username = models.CharField(max_length=400)
    email = models.EmailField(max_length= 200,unique=True)
    password = models.CharField(max_length=1000)
    image = models.ImageField(blank=True, null=True,default="photo.png",upload_to="photos/%Y/%m/%d")
    slug = models.SlugField(max_length=1000)

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"


    def save(self, *args, **kwargs):
        slug_s = slugify(f"{self.first_name}-{self.last_name}")
        queryset = UserAccount.objects.filter(slug__iexact=slug_s).count()
        count = 1
        slug = slug_s

        while(queryset):
            query = UserAccount.objects.get(slug__iexact=slug)
            if(query.id == self.id):
                break
            
            slug = slug_s + "-" + str(count)
            count += 1
            queryset = UserAccount.objects.filter(slug__iexact=slug).count()
        self.slug = slug

        
        
        super(UserAccount, self).save(*args, **kwargs)


