'use strict'

var express = require('express');
var ContactoController = require('../controllers/contactoCtrl');

// var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart({uploadDir : './imagenes'});

var contactoRouter = express.Router();

contactoRouter.get('/home-contacto', ContactoController.home);
contactoRouter.post('/create-contacto', ContactoController.createContacto);
contactoRouter.get('/contact/:id',ContactoController.getContactoById );
contactoRouter.get('/contacts', ContactoController.getAllContactos);
contactoRouter.patch('/update-contact/:id', ContactoController.updateContactoById);
contactoRouter.delete('/delete-contact/:id', ContactoController.deleteContactoById);


module.exports = contactoRouter;
