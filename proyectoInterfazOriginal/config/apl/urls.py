from django.urls import path
from apl.views import *
from apl.views.categoria.views import *

app_name = 'apl'

 # path('categoria/listar2/', lista_categoria, name='categoria_lista2'),
 
urlpatterns = [
    path('base/', base_html, name='base'),
    path('plantilla/', plantilla_html, name='plantilla')
    
]

