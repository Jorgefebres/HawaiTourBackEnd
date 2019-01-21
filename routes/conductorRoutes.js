'use strict';

var express = require('express');
var conductorRouter = express.Router();

var ConductorController = require('../controllers/conductorCtrl');

conductorRouter.get('/home-conductor', ConductorController.home);
conductorRouter.post('/create-conductor', ConductorController.createConductor);
conductorRouter.get('/conductor/:id', ConductorController.getConductorById);
conductorRouter.get('/conductores', ConductorController.getAllConductores);
conductorRouter.patch('/update-conductor/:id', ConductorController.updateConductorById);
conductorRouter.delete('/delete-conductor/:id', ConductorController.deleteConductorById);

module.exports = conductorRouter;