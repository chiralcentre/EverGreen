# Generated by Django 4.0.4 on 2022-06-09 12:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stockmarket', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='stockTicker',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]