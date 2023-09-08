from rest_framework import serializers

from banco.users.models import User


class UserSerializer(serializers.ModelSerializer):
    """Serailizar del modelo User herredado de ModelSerializer."""

    class Meta:
        """Se retornan todos los datos del usuario a exception de la contraseña."""

        exclude = (
            'password',
        )
        model = User


# pylint: disable=abstract-method
class ChangePasswordSerializer(serializers.Serializer):
    """Serializer para endpoint change-password."""

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=6)
    confirmed_new_password = serializers.CharField(required=True, min_length=6)

    def validate(self, attrs):
        """
        Se valida la contraseña cumpla con lo siguiente:

        - La contraseña actual sea la correcta
        - La nueva contraseña sea diferente de la actual
        - La nueva contraseña y la repetición de la contraseña sean iguales
        """

        if not self.context['request'].user.check_password(attrs.get('old_password')):
            raise serializers.ValidationError({'old_password': 'Contraseña incorrecta'})

        if attrs.get('confirmed_new_password') != attrs.get('new_password'):
            raise serializers.ValidationError(
                {'confirmed_new_password': 'Contraseña debe ser confirmada correctamente'}
            )
        return attrs

    def update(self, instance, validated_data):
        """Se materializa el cambio de contraseña."""

        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance

    @property
    def data(self):
        """Respuesta estandarizada para un cambio de contraseña exitoso."""

        return {'message': 'Contraseña actualizada correctamente'}


class UserUpdateSerializer(serializers.ModelSerializer):
    """Serializador de actualización de datos de un usuario."""

    class Meta:
        model = User
        fields = ['first_name', 'last_name']