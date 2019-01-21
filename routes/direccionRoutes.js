'use strict';

var express = require('express');
var DireccionController = require('../controllers/direccionCtrl');

var direccionRouter = express.Router();


direccionRouter.get('/home-direccion', DireccionController.home);
direccionRouter.post('/create-direccion', DireccionController.createDireccion);
direccionRouter.get('/direccion/:id', DireccionController.getDireccionById);
direccionRouter.get('/direcciones', DireccionController.getAllDirecciones);
direccionRouter.patch('/update-direccion/:id', DireccionController.updateDireccionById);
direccionRouter.delete('/delete-direccion/:id', DireccionController.deleteDireccionById);

module.exports = direccionRouter;
