from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    #def __str__(self):
        #Sreturn f"Username: {self.username} Id: {self.id}"

    pass



class Puzzle(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owner", null=True)
    name = models.CharField(max_length=50, default="")
    lastSave = models.CharField(max_length=50, default="")
    snap = models.TextField(default="")
    history = models.TextField(default="")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Owner: {self.owner} Name: {self.name} Last Save: {self.lastSave}"

    def serialize(self):
        return {
            "owner": self.owner.username,
            "name": self.name,
            "lastSave": self.lastSave,
            "snap": self.snap,
            "history": self.history,
        }
