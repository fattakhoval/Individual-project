# Generated by Django 5.1.4 on 2024-12-15 12:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0004_alter_message_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='chat_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat.chat'),
        ),
    ]