'use strict';

var express = require('express');
var categoriaRouter = express.Router();

var CategoriaController = require('../controllers/conductorCtrl');

categoriaRouter.get('/home-categoria', CategoriaController.home);



module.exports = categoriaRouter;