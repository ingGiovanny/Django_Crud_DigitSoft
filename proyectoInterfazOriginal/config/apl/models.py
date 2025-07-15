from django.db import models

#from datetime import date #sirve para trabajar fechas

class Administrador(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=40)
    contraseña = models.CharField(max_length=42, blank=True, null=True)
    correo_electronico = models.CharField(max_length=45, blank=True, null=True)

class Cliente(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    numero_documento = models.CharField(max_length=70)
    numero_telefonico = models.CharField(max_length=20)
    correo_electronico = models.CharField(max_length=70, blank=True, null=True)
    direccion = models.CharField(max_length=70, blank=True, null=True)

class ComprasMercancia(models.Model):
    id_compra = models.AutoField(primary_key=True)
    producto_id = models.ForeignKey('Producto', models.DO_NOTHING, db_column='producto_id', blank=True, null=True)
    cantidad_compras = models.IntegerField(blank=True, null=True)
    fecha_compra = models.DateField(blank=True, null=True)
    proveedor_nit_proveedor = models.ForeignKey('Proveedor', models.DO_NOTHING, db_column='proveedor_nit_proveedor', to_field='nit_proveedor', blank=True, null=True)
    administrador_id = models.ForeignKey(Administrador, models.DO_NOTHING, db_column='administrador_id', blank=True, null=True)
    precio_compra = models.CharField(max_length=50, blank=True, null=True)

class Equipo(models.Model):
    id_equipo = models.AutoField(primary_key=True)
    modelo = models.CharField(max_length=30, blank=True, null=True)
    clave = models.CharField(max_length=35, blank=True, null=True)
    cliente_id_cliente = models.ForeignKey(Cliente, models.DO_NOTHING, db_column='cliente_id_cliente', blank=True, null=True)

class Facturacion(models.Model):
    id_recibo = models.AutoField(primary_key=True)
    fecha_id_venta = models.DateField(blank=True, null=True)
    ventas_id_venta = models.ForeignKey('Ventas', models.DO_NOTHING, db_column='ventas_id_venta', blank=True, null=True)
    descripcion_venta = models.CharField(max_length=250, blank=True, null=True)
    nit_digitsoft = models.CharField(max_length=50, blank=True, null=True)

class Garantias(models.Model):
    id_garantias = models.AutoField(primary_key=True)
    facturacion_id_recibo = models.ForeignKey(Facturacion, models.DO_NOTHING, db_column='facturacion_id_recibo', blank=True, null=True)

class Marca(models.Model):
    id_marca = models.AutoField(primary_key=True)
    color = models.CharField(max_length=25)
    marca = models.CharField(max_length=35)
    descripcion = models.CharField(max_length=80)

class Orden_servicio(models.Model):
    id_orden_servicio = models.AutoField(primary_key=True)
    cliente_id_cliente = models.ForeignKey(Cliente, models.DO_NOTHING, db_column='cliente_id_cliente', blank=True, null=True)
    marca_id = models.ForeignKey(Marca, models.DO_NOTHING, db_column='marca_id', blank=True, null=True)
    tecnicos_id_tecnico = models.ForeignKey('Tecnicos', models.DO_NOTHING, db_column='tecnicos_id_tecnico', blank=True, null=True)
    descripcion_orden = models.CharField(max_length=50, blank=True, null=True)

class Producto(models.Model):
    id = models.AutoField(primary_key=True)
    nombre_producto = models.CharField(max_length=35)
    modelo_producto = models.CharField(max_length=40, blank=True, null=True)
    cantidad = models.IntegerField()
    color_producto = models.CharField(max_length=45)
    tipo = models.CharField(max_length=40, blank=True, null=True)
    marca_id = models.ForeignKey(Marca, models.DO_NOTHING, db_column='marca_id')

class Proveedor(models.Model):
    nit_proveedor = models.CharField(primary_key=True, max_length=50)
    nombre = models.CharField(max_length=50)
    cedula = models.CharField(max_length=50)
    direccion = models.CharField(max_length=50)
    telefono = models.CharField(max_length=50)

class ServicioTecnico(models.Model):
    id_servicio_tecnico = models.AutoField(primary_key=True)
    cliente_id_cliente = models.ForeignKey(Cliente, models.DO_NOTHING, db_column='cliente_id_cliente', blank=True, null=True)
    tecnicos_id_tecnico = models.ForeignKey('Tecnicos', models.DO_NOTHING, db_column='tecnicos_id_tecnico', blank=True, null=True)
    orden_servicio_id_orden_servicio = models.ForeignKey(Orden_servicio, models.DO_NOTHING, db_column='orden_servicio_id_ordenServicio', blank=True, null=True)

class Tecnicos(models.Model):
    id_tecnico = models.AutoField(primary_key=True)
    nombre_completo = models.CharField(max_length=50)
    n_documento = models.IntegerField()
    correo = models.CharField(max_length=60, blank=True, null=True)
    direccion = models.CharField(max_length=40, blank=True, null=True)
    especialidad = models.CharField(max_length=40, blank=True, null=True)
    tipo_tecnico = models.CharField(max_length=40, blank=True, null=True)

class Ventas(models.Model):
    id_venta = models.AutoField(primary_key=True)
    cliente_id_cliente = models.ForeignKey(Cliente, models.DO_NOTHING, db_column='cliente_id_cliente', blank=True, null=True)
    cantidad_vendidas = models.IntegerField(blank=True, null=True)
    valor_venta = models.DecimalField(max_digits=10, decimal_places=2)
