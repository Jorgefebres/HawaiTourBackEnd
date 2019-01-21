'use strict';

var express = require('express');
var productoRouter = express.Router();

var  ProductoController = require ('../controllers/productoCtrl');

productoRouter.get('/home-familiar', ProductoController.home);



module.exports = productoRouter;