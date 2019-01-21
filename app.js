// Archivo que guarda la configuracion de bodyparser y express

'use strict'

var express = require('express');
var bodyparser = require('body-parser');
var app = express();

// require('./api/config/passport');
// app.use(passport.initialize());

// var rutas_de_conductor = require('./routes/project');
var rutas_de_contacto = require('./routes/contactoRoutes');
var rutas_de_direccion = require('./routes/direccionRoutes');
var rutas_de_empresa = require('./routes/empresaRouter');
var rutas_de_visitaDomiciliaria = require('./routes/visitaDomiciliariaRoutes');
var rutas_de_familiar = require('./routes/familiarRouter');
var rutas_de_usuario = require('./routes/usuarioRoutes');
var rutas_de_costo = require('./routes/costoRoutes');
var rutas_de_unidad = require('./routes/unidadRoutes');
var rutas_de_conductor = require('./routes/conductorRoutes');
var rutas_de_servicio = require('./routes/servicioRoutes');
var rutas_de_producto = require('./routes/productoRoutes');
var rutas_de_categoria = require('./routes/categoriaRoutes');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use((req, res, next) => {
    //para permitir quien podrá conectarse al servidor
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
});

// cargando archivo de rutas

// app.use('/API', rutas_de_conductor);
app.use('/API', rutas_de_contacto);
app.use('/API', rutas_de_direccion);
app.use('/API', rutas_de_empresa);
app.use('/API', rutas_de_visitaDomiciliaria);
app.use('/API', rutas_de_familiar);
app.use('/API', rutas_de_usuario);
app.use('/API', rutas_de_costo);
app.use('/API', rutas_de_unidad);
app.use('/API', rutas_de_conductor);
app.use('/API', rutas_de_servicio);
app.use('/API', rutas_de_categoria);
app.use('/API', rutas_de_producto);

module.exports = app;