from rest_framework import serializers

from banco.users.models import User
from banco.accounts.serializers import AccountSerializer

class UserSerializer(serializers.ModelSerializer):
    """Serailizar del modelo User herredado de ModelSerializer."""

    account = AccountSerializer(many=True, read_only=True, source='accounts')

    class Meta:
        """Se retornan todos los datos del usuario a exception de la contraseña."""

        exclude = (
            'password',
        )
        model = User
