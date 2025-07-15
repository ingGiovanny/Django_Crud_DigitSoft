from django.urls import path
from apl.views import *
from apl.views.categoria.views import *

app_name = 'apl'

 # path('categoria/listar2/', lista_categoria, name='categoria_lista2'),
 #
 
urlpatterns = [
    path('base/', base_html, name='base'),
    path('plantilla/', plantilla_html, name='plantilla'),
    path('home/', home_html, name='home'),
    path('gestion_garantia/', gestion_garantia_html, name='gestion_garantia'),
    path('gestion_producto/', gestion_producto_html, name='gestion_producto'),
]

