# Generated by Django 4.0.4 on 2022-07-02 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stockmarket', '0002_bookmark'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookmark',
            name='stockTicker',
            field=models.CharField(blank=True, max_length=20, null=True, unique=True),
        ),
    ]
