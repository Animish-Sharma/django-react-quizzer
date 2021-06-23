from django.contrib import admin
from .models import UserAccount
# Register your models here.

class UserAccountAdmin(admin.ModelAdmin):
    list_display = ['email']
    search_fields = ['email']
    exclude = ['slug']

admin.site.register(UserAccount,UserAccountAdmin)