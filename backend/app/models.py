from django.db import models

class User(models.Model):
    id = models.CharField(primary_key=True, max_length=255, blank=False)
    name = models.CharField(max_length=200, blank=False)
    email = models.EmailField(max_length=200, blank=False)
    email_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class Task(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.PROTECT)
    title = models.CharField(max_length=200, blank=False)
    priority = models.CharField(blank=False, max_length=200, default='normal')
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=200, default='pending')
    tag = models.CharField(max_length=200, blank=True, null=True)
    deadline = models.DateTimeField(blank=True, null=True)
    ended_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
class Session(models.Model):
    id = models.CharField(primary_key=True, max_length=255, blank=False)
    user_id = models.ForeignKey(User, on_delete=models.PROTECT)
    token = models.CharField(max_length=500, blank=False)
    expires_at = models.DateTimeField(blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(blank=True,null=True)
    
    def __str__(self):
        return self.token
    
class Account(models.Model):
    id = models.CharField(primary_key=True, max_length=255, blank=False)
    user_id = models.ForeignKey(User, on_delete=models.PROTECT)
    account_id = models.CharField(blank=False)
    provider_id = models.CharField(blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(blank=False)
    
    def __str__(self):
        return self.accountId
    
class Verification(models.Model):
    id = models.CharField(primary_key=True, max_length=255, blank=False)
    identifier = models.CharField(max_length=200, blank=False)
    value = models.CharField(max_length=500, blank=False)
    expired_at = models.DateTimeField(blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(blank=False)

    def __str__(self):
        return self.identifier