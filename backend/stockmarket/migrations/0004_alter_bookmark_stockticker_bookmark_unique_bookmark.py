# Generated by Django 4.0.4 on 2022-07-04 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stockmarket', '0003_alter_bookmark_stockticker'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookmark',
            name='stockTicker',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddConstraint(
            model_name='bookmark',
            constraint=models.UniqueConstraint(fields=('name', 'stockTicker'), name='unique_bookmark'),
        ),
    ]