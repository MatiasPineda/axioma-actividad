from django.urls import path

from banco.users.views import UserRetrieveView

urlpatterns = [
    path('user/', UserRetrieveView.as_view(), name='user'),
]