'use strict';

var Familiar = require('../models/familiar');
var Contacto = require('../models/contacto');


var familiarController = {
    home:function(req , res){
        return res.status(200).send({message: "Home del controlador de familiar!!!" });
    },
    createFamiliar:function(req, res){
        var objFamiliar = new Familiar();
        var params = req.body;
        
        var existeContacto = false;
        
        objFamiliar.nombre = params.nombre;
        objFamiliar.tipoParentezco = params.tipoParentezco;
        objFamiliar.contacto = params.contacto;
        
        console.log('Recibido:', objFamiliar.nombre, objFamiliar.tipoParentezco, objFamiliar.contacto);
        
        let buscandoContacto = ()=>{
            return new Promise(function(resolve,reject){
                Contacto.findById(objFamiliar.contacto).exec((err, contactoEncontrado)=>{
                    console.log('CHEKANDO CONTACTO!!!!');
                    if (!contactoEncontrado){
                        return res.status(404).send({error: "El contacto no existe en la base de datos"})
                    } else {
                        console.log('Se encontró el contacto en la base de datos');  
                        existeContacto = true;
                    }
                    console.log('CONTACTO LISTO!!!!');
                    return resolve();
                });
            });
        }
        
        //EJECUTAMOS LAS PROMESAS EN EL ORDEN REQUERIDO
        
        buscandoContacto().then(() => {
            if(existeContacto){
                objFamiliar.save((err, familiarGuardado)=>{
                    if(err){
                        return res.status(500).send({ error : "Error al intentar guardar el familiar: " + err});
                    }
                    if(!familiarGuardado){
                        return res.status(404).send({ error : "Error al guardar el familiar: " + err});
                    }
                    return res.status(200).send({ saved : familiarGuardado});
                });
            }
        });
    },
    getFamiliarById: function(req, res){
        var id = req.params.id;
        Familiar.findById(id, (err, familiarEncontrado)=>{
            if(err){
                return res.status(500).send({ error : "Error al traer el familiar de la base de datos: "+ err});
            }
            if(!familiarEncontrado){
                return res.status(404).send({ error : "Error, No existe ese familiar en la base de datos"});
            }
            return res.status(200).send({ found : familiarEncontrado});
        });
    },
    getAllFamiliares: function(req, res){
        Familiar.find().exec((err, familiaresEncontrados)=>{
            if(err){
                return res.status(500).send({ error : "Error al traer los familiares de la base de datos" + err});
            }
            if(!familiaresEncontrados){
                return res.status(404).send({ error : "Error, no existen familiares en la base de datos"});
            }
            return res.status(200).send({ found : familiaresEncontrados});
        });
    },
    updateFamiliarById: function (req, res){
        var id = req.params.id;
        var parametrosNuevos = req.body;
        
        Familiar.findByIdAndUpdate(id, parametrosNuevos, {new : true},(err, familiaresActualizados)=>{
            if(err){
                return res.status(500).send({ error : "Error al intentar actualizar el familiar en la base de datos" + err});
            }
            if(!familiaresActualizados){
                return res.status(200).send({ error : "Error, No existe ese familiar en la base de datos"});
            }
            return res.status(200).send({updated: familiaresActualizados});
        });
    },
    deleteFamiliarById : function(req, res){
        var id = req.params.id;
        Familiar.findByIdAndRemove(id, (err, familiarEliminado)=>{
            if(err){
                return res.status(500).send({error : "Error, No se pudo eliminar el familiar de la base de datos: " + err});
            }
            if(!familiarEliminado){
                return res.status(404).send({error : "Error, el familiar no existe en la base de datos"});                
            }
            return res.satus(200).send({ deleted: familiarEliminado});
        });
    }
};


module.exports = familiarController;