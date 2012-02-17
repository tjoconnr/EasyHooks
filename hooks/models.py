from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from datetime import datetime

class Hook(models.Model):
    name = models.CharField(max_length=200)
    url = models.CharField(max_length=500)
    user  = models.ForeignKey(User, related_name='user1')
    created_date = models.DateTimeField(default=datetime.now())
    modified_date = models.DateTimeField(default=datetime.now())

class HookAction(models.Model):
    hook = models.ForeignKey(Hook)
    type = models.CharField(max_length=200)
    sort = models.IntegerField()
    created_date = models.DateTimeField(default=datetime.now())
    modified_date = models.DateTimeField(default=datetime.now())

class HookPost(models.Model):
    hook = models.ForeignKey(Hook)
    req_headers = models.TextField()
    req_body = models.TextField()
    req_ip = models.IPAddressField()
    created_date = models.DateTimeField(default=datetime.now())

