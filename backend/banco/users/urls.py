from django.urls import path

from banco.users.views import UserRetriveView

urlpatterns = [
    path('user/<int:pk>', UserRetriveView.as_view(), name='user'),
]