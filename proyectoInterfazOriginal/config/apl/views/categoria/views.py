from django import forms
from django.views.generic import ListView, CreateView,FormView,UpdateView,DeleteView
from apl.views.categoria.views import *
#from apl.models import Categoria
#from apl.forms import CategoriaForm
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.utils.decorators import method_decorator
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.urls import reverse_lazy
#from django.contrib.auth.decorators import login_required
from apl.models import *

def base_html(request):
    data = {
        'title': 'Base Template',
        'message': 'Welcome to the base template of the application.'
    }
    return render(request, 'categoria/content.html', data)

def plantilla_html(request):
    data = {
        'title': 'Plantilla HTML',
        'message': 'This is a sample HTML template.'
    }
    return render(request, 'categoria/plantilla.html', data)


    

