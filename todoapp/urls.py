from django.urls import path
from . import views

urlpatterns = [
    path('', views.journal_list, name='journal_list'),
]

htmx_urlpatterns = [
    path("create-entry", views.create_entry, name="create-entry"),
    path("edit-entry-form/<int:pk>", views.edit_entry_form, name="edit-entry-form"),
    path("entry/<int:pk>/delete", views.delete_entry, name="delete-entry"),
]

urlpatterns += htmx_urlpatterns


