# Generated by Django 5.1.5 on 2025-02-09 14:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_rename_user_id_account_user_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='user',
        ),
    ]
