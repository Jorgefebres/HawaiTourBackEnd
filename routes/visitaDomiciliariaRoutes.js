'use strict';

var express = require('express');
var VisitaDomiciliariaController = require ('../controllers/visitaDomiciliaria');
var visitaDomiciliariaRouter = express.Router();

visitaDomiciliariaRouter.get('/home-visita-domiciliaria', VisitaDomiciliariaController.home);
visitaDomiciliariaRouter.post('/create-visita-domiciliaria', VisitaDomiciliariaController.createVisitaDomiciliaria);
visitaDomiciliariaRouter.get('/visita-domiciliaria/:id', VisitaDomiciliariaController.getVisitaDomiciliaria);
visitaDomiciliariaRouter.get('/visitas-domiciliarias', VisitaDomiciliariaController.getAllVisitasDomiciliarias);
visitaDomiciliariaRouter.patch('/update-visita-domiciliaria/:id', VisitaDomiciliariaController.updateVisitaDomiciliaria);
visitaDomiciliariaRouter.delete('/delete-visita-domiciliaria/:id', VisitaDomiciliariaController.deleteVisitaDomiciliaria);
module.exports = visitaDomiciliariaRouter;