from django.db import models
from banco.users.models import User


class Account(models.Model):
    """Modelo de cuentas bancarias."""
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='Propietario',
    )
    number = models.CharField(max_length=20, unique=True)
    accounting_balance = models.BigIntegerField(
        default=0,
        verbose_name='Saldo contable',
    )
    current_balance = models.BigIntegerField(
        default=0,
        verbose_name='Saldo actual',
    )
    line_of_credit_balance = models.PositiveIntegerField(
        default=0,
        verbose_name='Saldo de línea de crédito',
    )
    total_charges = models.BigIntegerField(
        default=0,
        verbose_name='Total de cargos',
    )
    total_credits = models.BigIntegerField(
        default=0,
        verbose_name='Total de abonos',
    )

    class Meta:
        verbose_name = 'Cuenta'
        verbose_name_plural = 'Cuentas'
