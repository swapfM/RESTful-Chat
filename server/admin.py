from django.contrib import admin
from .models import Channel, Category, Server

# Register your models here.

admin.site.register(Channel)
admin.site.register(Category)
admin.site.register(Server)
