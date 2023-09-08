from rest_framework.serializers import ModelSerializer
from banco.accounts.models import Account


class AccountSerializer(ModelSerializer):
    """Serializador de cuentas"""

    class Meta:
        model = Account
        fields = '__all__'