from rest_framework.generics import RetrieveAPIView
from banco.users.serializers import UserSerializer


class UserRetriveView(RetrieveAPIView):
    """Retorna los datos del usuario autenticado."""

    serializer_class = UserSerializer

    def get_object(self):
        """Se retorna al usuario autenticado para el detalle."""

        return self.request.user
