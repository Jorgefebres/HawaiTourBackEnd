'use strict';

var express = require('express');
var servicioRoutes = express.Router();

var ServicioController = require('../controllers/servicioCtrl');

servicioRoutes.get('/home-servicio', ServicioController.home);
servicioRoutes.post('/create-servicio', ServicioController.createServicio);
servicioRoutes.get('/servicio/:id', ServicioController.getServicioById);
servicioRoutes.get('/servicios',ServicioController.getAllServicios);
servicioRoutes.patch('/update-servicio/:id', ServicioController.updateServicioById);
servicioRoutes.delete('/delete-servicio/:id', ServicioController.deleteServicioById);

module.exports = servicioRoutes;