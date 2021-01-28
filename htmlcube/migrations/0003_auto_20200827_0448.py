# Generated by Django 3.0.8 on 2020-08-27 04:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('htmlcube', '0002_puzzle'),
    ]

    operations = [
        migrations.AddField(
            model_name='puzzle',
            name='history',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='puzzle',
            name='name',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='puzzle',
            name='snap',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='puzzle',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='puzzle', to=settings.AUTH_USER_MODEL),
        ),
    ]
