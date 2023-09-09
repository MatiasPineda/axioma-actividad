from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import UserManager as BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    """Manager personalizado creado para no solicitar el nombre usuario."""

    def create_user(self, dni, names, surnames, password=None):
        if not dni:
            raise ValueError("The DNI field must be set")

        user = self.model(
            dni=dni,
            names=names,
            surnames=surnames,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, dni, names, surnames, password=None):
        user = self.create_user(
            dni=dni,
            names=names,
            surnames=surnames,
            password=password,
        )
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractUser):
    """Modelo personalizado de usuarios basado en el modelo abstracto de usuarios de Django."""

    dni = models.CharField('Rut', unique=True, max_length=15)
    names = models.CharField('Nombres', max_length=255)
    surnames = models.CharField('Apellidos', max_length=255)
    is_active = models.BooleanField(default=True)

    failed_login_attempts = models.IntegerField(default=0)
    status = models.BooleanField(verbose_name='Bloqueado', default=False)

    objects = UserManager()

    username = None

    USERNAME_FIELD = 'dni'
    REQUIRED_FIELDS = ['names', 'surnames']

    def __str__(self):
        return self.names

    def get_full_name(self):
        return f"{self.names} {self.surnames}"

    def get_short_name(self):
        return self.names

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        db_table = 'usuario'


    def save(self, *args, **kwargs):
        if self.is_active and self.failed_login_attempts >= 3 and self.status is False:
            self.failed_login_attempts = 0
        super(User, self).save(*args, **kwargs)
