from django.urls import path

from . import views

urlpatterns = [
    path('', views.crawl, name='crawl'),
]