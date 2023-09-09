from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from banco.users.serializers import UserSerializer
from banco.users.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework import status
from rest_framework.response import Response


class UserRetrieveView(RetrieveAPIView):
    """Retorna los datos del usuario autenticado."""

    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """Se retorna al usuario autenticado para el detalle."""
        return self.request.user


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):

        user = User.objects.get(dni=request.data['dni'])

        if user.status is True and not user.is_superuser:
            return Response({'detail': 'Your account is locked. Please contact support.'},
                            status=status.HTTP_403_FORBIDDEN)

        try:
            response = super().post(request, *args, **kwargs)
            user.failed_login_attempts = 0
            user.save()

        except Exception as error:
            if not user.is_superuser:
                user.failed_login_attempts += 1
                if user.failed_login_attempts >= 3:
                    user.status = True
                user.save()
            raise error

        return response
