from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('toggle_star/',view=views.toggle_star, name="create_star"),
    path('api/get_starred_verses/<int:book_num>/<int:chapter_num>/', views.get_starred_verses, name='get_fav_verses'),
]