# Generated by Django 5.1.5 on 2025-02-16 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0011_rename_update_at_session_updated_at_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='session',
            old_name='expired_at',
            new_name='expires_at',
        ),
        migrations.RenameField(
            model_name='verification',
            old_name='expired_at',
            new_name='expires_at',
        ),
        migrations.AddField(
            model_name='session',
            name='ip_address',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='session',
            name='user_agent',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
