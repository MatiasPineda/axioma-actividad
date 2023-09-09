from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from banco.users.models import User
from banco.accounts.models import Account


class AccountInline(admin.StackedInline):
    """Administración de cuentas `inline`."""

    readonly_fields = (
        'number',
        'accounting_balance',
        'current_balance',
        'line_of_credit_balance',
        'total_charges',
        'total_credits',
    )
    model = Account
    extra = 1
    max_num = 1
    can_delete = False


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Administración de Usuarios."""

    inlines = (AccountInline,)

    list_display = (
        'id',
        'dni',
        'names',
        'surnames',
        'status',
    )

    fieldsets = (
        (None, {'fields': ('dni', 'names', 'surnames',
         'password', 'status', 'failed_login_attempts')}),
        ('Permisos', {'fields': ('is_active', 'is_superuser'), }),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('dni', 'names', 'surnames', 'password1', 'password2', 'is_active', 'is_superuser'),
        }),
    )

    readonly_fields = ('failed_login_attempts',)

    ordering = ('dni',)
