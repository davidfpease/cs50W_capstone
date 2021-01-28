from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.logout_view, name="logout"),
    path("saved_puzzles", views.saved_puzzles, name="saved_puzzles"),
    path("saved_puzzle/<str:name>", views.saved_puzzle, name="saved_puzzle"),
    path("save", views.save, name="save")

]
