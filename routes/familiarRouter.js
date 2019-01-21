'use strict';

var express = require('express');
var familiarRouter = express.Router();

var  FamiliarController = require ('../controllers/familiarCtrl');

familiarRouter.get('/home-familiar', FamiliarController.home);
familiarRouter.post('/create-familiar', FamiliarController.createFamiliar);
familiarRouter.get('/familiar/:id', FamiliarController.getFamiliarById);
familiarRouter.get('/familiares', FamiliarController.getAllFamiliares);
familiarRouter.patch('/update-familiar/:id', FamiliarController.updateFamiliarById);
familiarRouter.delete('/delete-familiar/:id', FamiliarController.deleteFamiliarById);


module.exports = familiarRouter;