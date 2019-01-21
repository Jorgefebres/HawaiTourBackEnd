'use strict';

var express = require('express');
var unidadRouter = express.Router();

var UnidadController = require('../controllers/unidadCtrl');

unidadRouter.get('/home-unidad', UnidadController.home);
unidadRouter.post('/create-unidad', UnidadController.createUnidad);
unidadRouter.get('/unidad/:id', UnidadController.getUnidadById);
unidadRouter.get('/unidades', UnidadController.getAllUnidades);
unidadRouter.patch('/update-unidad/:id', UnidadController.updateUnidadById);
unidadRouter.delete('/delete-unidad/:id', UnidadController.deleteUnidadById);

module.exports = unidadRouter;