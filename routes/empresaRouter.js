'use strict';

var express = require('express');
var EmpresaController = require('../controllers/empresaCtrl');

var empresaRouter = express.Router();


empresaRouter.get('/home-empresa', EmpresaController.home);
empresaRouter.post('/create-empresa', EmpresaController.createEmpresa);
empresaRouter.get('/empresa/:id', EmpresaController.getEmpresaById);
empresaRouter.get('/empresas', EmpresaController.getAllEmpresas);
empresaRouter.patch('/update-empresa/:id', EmpresaController.updateEmpresaById);
empresaRouter.delete('/delete-empresa/:id', EmpresaController.deleteEmpresaById);

module.exports = empresaRouter;