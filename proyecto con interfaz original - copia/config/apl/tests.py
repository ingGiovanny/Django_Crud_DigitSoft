from django.test import TestCase
from pathlib import Path
import sys 

sys.path.append(str(Path(__file__).resolve().parent.parent))
from config.wsgi import *
from apl.models import *

#listar 
query = Tipo.objects.all()
print(query)
#insertar

t= Tipo(nombre='prueba2').save()
