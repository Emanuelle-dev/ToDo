from django.db import models

class User(models.Model):
    name = models.CharField(max_length=200, blank=False)
    email = models.EmailField(max_length=200, blank=False)
    emailVerified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class Task(models.Model):
    userId = models.ForeignKey(User, on_delete=models.PROTECT)
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
    userId = models.ForeignKey(User, on_delete=models.PROTECT)
    token = models.CharField(max_length=255, blank=False)
    expiresAt = models.DateTimeField(blank=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    updateAt = models.DateTimeField(blank=True, null=False)
    
    def __str__(self):
        return self.token
    
class Account(models.Model):
    userId = models.ForeignKey(User, on_delete=models.PROTECT)
    accountId = models.CharField(primary_key=True)
    providerId = models.CharField(primary_key=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updateAt = models.DateTimeField(blank=False, null=False)
    
    def __str__(self):
        return self.accountId
    
class Verification(models.Model):
    identifier = models.CharField(max_length=200, blank=False)
    value = models.CharField(max_lenght=200, blank=False)
    expiredAt = models.DateTimeField(blank=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    updateAt = models.DateTimeField(blank=False, null=False)
    
    def __str__(self):
        return self.identifier