from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from banco.users.serializers import UserSerializer


class UserRetrieveView(RetrieveAPIView):
    """Retorna los datos del usuario autenticado."""

    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Add this line to require authentication
    
    def get_object(self):
        """Se retorna al usuario autenticado para el detalle."""

        return self.request.user
