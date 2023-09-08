# Generated by Django 4.2.5 on 2023-09-09 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_remove_user_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='dni',
            field=models.CharField(max_length=15, unique=True, verbose_name='Rut'),
        ),
        migrations.AlterField(
            model_name='user',
            name='is_staff',
            field=models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status'),
        ),
        migrations.AlterField(
            model_name='user',
            name='names',
            field=models.CharField(max_length=255, verbose_name='Nombres'),
        ),
        migrations.AlterField(
            model_name='user',
            name='status',
            field=models.BooleanField(default=False, verbose_name='Bloqueado'),
        ),
        migrations.AlterField(
            model_name='user',
            name='surnames',
            field=models.CharField(max_length=255, verbose_name='Apellidos'),
        ),
    ]
