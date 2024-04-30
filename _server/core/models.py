from django.db import models

# Create your models here.
class Star(models.Model):
    verseNum=models.PositiveIntegerField()
    chapterNum=models.PositiveIntegerField()
    bookNum=models.PositiveIntegerField()