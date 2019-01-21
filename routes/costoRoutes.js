'use strict';

var express = require('express');
var costoRouter = express.Router();

var CostoController = require('../controllers/costoCtrl');

costoRouter.get('/home-costo', CostoController.home);
costoRouter.post('/create-costo', CostoController.createCosto);
costoRouter.get('/costo/:id', CostoController.getCostoById);
costoRouter.get('/costos', CostoController.getAllCostos);
costoRouter.patch('/update-costo/:id', CostoController.updateCostoById);
costoRouter.delete('/delete-costo/:id', CostoController.deleteCostoById);


module.exports = costoRouter;