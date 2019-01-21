'use strict';

var Conductor = require('../models/conductor');
var Direccion = require('../models/direccion');
var Contacto = require('../models/contacto');
var Familiar = require('../models/familiar');
var VisitaDomiciliaria = require('../models/visitaDomiciliaria');

var conductorController = {
    home: function (req, res){
        return res.status(200).send({message : "Home del controlador conductor!!!"});
    },
    createConductor:function(req, res){
        var objConductor = new Conductor();
        var params = req.body;
        
        var existeDireccion = false;
        var existeContacto = false;
        var existeFamiliar = false;
        var existeVisitaDomiciliaria = false;
        
        objConductor.codigo = params.codigo;
        objConductor.nombre = params.nombre;
        objConductor.apellido = params.apellido;
        objConductor.fechaNacimiento = params.fechaNacimiento;
        objConductor.vencimientoContrato = params.vencimientoContrato;
        objConductor.vencimientoBrevette = params.vencimientoBrevette;
        objConductor.examenMedico = params.examenMedico;
        objConductor.direccion = params.direccion;
        objConductor.contacto = params.contacto;
        objConductor.familiar = params.familiar;
        objConductor.visitaDomiciliaria = params.visitaDomiciliaria;
        
        let buscandoDireccion = () => {
            return new Promise(function(resolve,reject){
                Direccion.findById(objConductor.direccion).exec((err, direccionEncontrada)=>{
                    console.log('CHEKANDO DIRECCION!!!!');
                    if (!direccionEncontrada){
                        return res.status(404).send({error: "La direccion no existe en la base de datos"})
                    } else {
                        console.log('Se encontró la direccion en la base de datos');   
                        existeDireccion = true;    
                    }
                    console.log('DIRECCION LISTO!!!!');
                    return resolve();
                }); 
            });
        }

        let buscandoContacto = ()=>{
            return new Promise(function(resolve,reject){
                Contacto.findById(objConductor.contacto).exec((err, contactoEncontrado)=>{
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
        
        let buscandoFamiliar= () => {
            return new Promise(function(resolve,reject){
                Familiar.findById(objConductor.familiar).exec((err, familiarEncontrado)=>{
                    console.log('CHEKANDO FAMILIAR!!!!');
                    if (!familiarEncontrado){
                        return res.status(404).send({error: "El familiar no existe en la base de datos"})
                    } else {
                        console.log('Se encontró al familiar en la base de datos');   
                        existeFamiliar = true;    
                    }
                    console.log('FAMILIAR LISTO!!!!');
                    return resolve();
                }); 
            });
        }
        let buscandoVisitaDomiciliaria= () => {
            return new Promise(function(resolve,reject){
                VisitaDomiciliaria.findById(objConductor.visitaDomiciliaria).exec((err, visitaDomiciliariaEncontrada)=>{
                    console.log('CHEKANDO VISITA DOMICILIARIA!!!!');
                    if (!visitaDomiciliariaEncontrada){
                        return res.status(404).send({error: "La visita Domiciliaria no existe en la base de datos"})
                    } else {
                        console.log('Se encontró la visita Domiciliaria en la base de datos');   
                        existeVisitaDomiciliaria = true;    
                    }
                    console.log('VISITA DOMICILIARIA LISTO!!!!');
                    return resolve();
                }); 
            });
        }      
        //EJECUTAMOS LAS PROMESAS EN EL ORDEN REQUERIDO
        buscandoDireccion().then(buscandoContacto).then(buscandoFamiliar).then(buscandoVisitaDomiciliaria).then(() => {
            if(existeContacto && existeDireccion && existeContacto && existeVisitaDomiciliaria){
                objConductor.save((err, conductorGuardado)=>{
                    if(err){
                        return res.status(500).send({error : "Error al intentar guardar el conductor en la base de datos" + err});
                    }
                    if(!conductorGuardado){
                        return res.status(404).send({error : "Error al guardar el conductor en la base de datos"});
                    }
                    return res.status(200).send({saved: conductorGuardado});
                });
            }
        });
    },
    getConductorById: function (req, res){
        var id = req.params.id;
        
        Conductor.findById(id, (err, conductorEncontrado)=>{
            if(err){
                return res.status(500).send({error : "Error al intentar traer al conductor de la base de datos" + err});
            }
            if(!conductorEncontrado){
                return res.status(404).send({error : "Error, el conductor no existe en la base de datos"});
            }
            return res.status(200).send({found: conductorEncontrado});
        });
    },
    getAllConductores:function(req, res){
        Conductor.find().exec((err, conductoresEncontrados)=>{
            if(err){
                return res.status(500).send({error : "Error al intentar traer a los conductores de la base de datos" + err});
            }
            if(!conductoresEncontrados){
                return res.status(404).send({error : "Error, No existen conductores en la base de datos"});
            }
            return res.status(200).send({found: conductoresEncontrados});
        });
    },
    updateConductorById:function(req, res){
        var parametrosNuevos = req.body;
        var idConductor = req.params.id;
        
        Conductor.findByIdAndUpdate(idConductor, parametrosNuevos, {new : true}, (err, conductorActualizado)=>{
            if(err){
                return res.status(500).send({error : "Error al intentar actualizar al conductor en la base de datos" + err});
            }
            if(!conductorActualizado){
                return res.status(404).send({error : "Error, No existen conductores con ese ID en la base de datos"});
            }
            return res.status(200).send({updated: conductorActualizado});
        });
    },
    deleteConductorById:function(req, res){
        var idConductor = req.params.id;
        
        console.log('Id Recibido: ', idConductor);
        Conductor.findByIdAndRemove(idConductor,(err, conductorEliminado)=>{
            if(err){
                return res.status(500).send({error : "Error al intentar eliminar al conductor en la base de datos" + err});
            }
            if(!conductorEliminado){
                return res.status(404).send({error : "Error, No existen conductores con ese ID en la base de datos"});
            }
            return res.status(200).send({deleted: conductorEliminado});
        });
    }
};

module.exports = conductorController;