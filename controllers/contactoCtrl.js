'use strict';

var Contacto = require("../models/contacto");

var fs = require('fs');

var contactoController = {
    home : function(req, res){
        return res.status(200).send({
            message : "HOME del controlador de contacto!!!" 
        });
    },    
    // create contacto
    createContacto: function (req, res){
        var objContacto = new Contacto();
        //creando un arreglo con los parametros recibidos
        var params = req.body;
        //objContacto._id = params._id;
        objContacto.tipo = params.tipo;
        objContacto.numero = params.numero;
        objContacto.numero2 = params.numero2;
        
        console.log('recibido: ', params.tipo, params.numero);
        objContacto.save((err, contactoGuardado)=>{
            if(err){
                return res.status(500).send({error : "Error al Guardar el contacto" + err});
            }
            if(!contactoGuardado){
                return res.status(404).send({error : "Error al guardar un nuevo contacto"});
            }
            return res.status(200).send({saved: contactoGuardado});
        });
    },
    getContactoById: function (req , res){
        var id = req.params.id;
        console.log('id: ' , id);
        Contacto.findById(id, (err, contactoRecibido)=>{
            if(err){
                return res.status(500).send({error : "Error al traer el contacto : " + err});
            }
            if(!contactoRecibido){
                return res.status(404).send({error : "Error, el contacto no existe"});
            }
            return res.status(200).send({found: contactoRecibido});
        });
    },
    getAllContactos: function (req, res){
        Contacto.find().exec((err, contactos)=>{
            if(err){
                return res.status(500).send({error : "Error al traer los contactos de la base de datos : " + err});
            }
            if(!contactos){
                return res.status(404).send({error: "No existe ningun contacto en la base de datos"});
            }
            return res.status(200).send({contacts: contactos});
        })
    },
    updateContactoById: function (req, res){
        var nuevosParametros = req.body;
        var contactoId = req.params.id;

        Contacto.findByIdAndUpdate(contactoId, nuevosParametros, {new : true}, (err, contactoActualizado)=>{
            if(err){
                return res.status(500).send({error : "Error al actualizar el contacto: " + err});
            }
            if(!contactoActualizado){
                return res.status(404).send({error : "Error, No se pudo actualizar el contacto en la base de datos"});
            }
            return res.status(200).send({updated:contactoActualizado});
        });        
    },
    deleteContactoById : function (req, res){
        var contactoId = req.params.id;
        Contacto.findByIdAndRemove(contactoId, (err, contactoEliminado)=>{
            if(err){
                return res.status(500).send({error : "Error al eliminar el contacto" + err});
            }
            if(!contactoEliminado){
                return res.status(404).send({error : "Error al eliminar el contacto, No se encuentra en la base de datos"});
            }
            return res.status(200).send({deleted: contactoEliminado});
        });
    }
}
module.exports = contactoController;