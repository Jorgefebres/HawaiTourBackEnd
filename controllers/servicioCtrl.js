'use strict';

var Servicio = require('../models/servicio');
var Empresa = require('../models/empresa');
var Conductor = require('../models/conductor');
var Unidad = require('../models/unidad');
var Costo = require('../models/costo');

var servicioController = {
    home:function(req, res){
        return res.status(200).send({message: "Home del controller servicio!!!"});
    },
    createServicio:function(req, res){
        var objServicio = new Servicio();
        var params = req.body;
        
        var existeEmpresa = false;
        var existeConductor = false;
        var existeUnidad = false;
        var existeCosto = false;
        
        objServicio.empresa = params.empresa;
        objServicio.fecha = params.fecha;
        objServicio.horaReserva = params.horaReserva;
        objServicio.horaLlegada = params.horaLlegada;
        objServicio.horaInicio = params.horaInicio;
        objServicio.horaFin = params.horaFin;
        objServicio.turno = params.turno;
        objServicio.calidadServicio = params.calidadServicio;
        objServicio.observacion = params.observacion;
        objServicio.conductor = params.conductor;
        objServicio.unidad = params.unidad;
        objServicio.costo = params.costo;
        
        
        let buscandoEmpresa= () => {
            return new Promise(function(resolve,reject){
                Empresa.findById(objServicio.empresa).exec((err, empresaEncontrada)=>{
                    console.log('CHEKANDO EMPRESA!!!!');
                    if (!empresaEncontrada){
                        return res.status(404).send({error: "La empresa no existe en la base de datos"})
                    } else {
                        console.log('Se encontró la empresa en la base de datos');   
                        existeEmpresa = true;    
                    }
                    console.log('EMPRESA LISTO!!!!');
                    return resolve();
                }); 
            });
        }
        
        let buscandoConductor= () => {
            return new Promise(function(resolve,reject){
                Conductor.findById(objServicio.conductor).exec((err, conductorEncontrado)=>{
                    console.log('CHEKANDO CONDUCTOR!!!!');
                    if (!conductorEncontrado){
                        return res.status(404).send({error: "El conductor no existe en la base de datos"})
                    } else {
                        console.log('Se encontró al conductor en la base de datos');   
                        existeConductor = true;    
                    }
                    console.log('CONDUCTOR LISTO!!!!');
                    return resolve();
                }); 
            });
        }
        let buscandoUnidad = () => {
            return new Promise(function(resolve,reject){
                Unidad.findById(objServicio.unidad).exec((err, unidadEncontrada)=>{
                    console.log('CHEKANDO UNIDAD!!!!');
                    if (!unidadEncontrada){
                        return res.status(404).send({error: "La unidad no existe en la base de datos"})
                    } else {
                        console.log('Se encontró la unidad en la base de datos');   
                        existeUnidad = true;    
                    }
                    console.log('UNIDAD LISTO!!!!');
                    return resolve();
                }); 
            });
        }
        let buscandoCosto = ()=>{
            return new Promise(function(resolve,reject){
                Costo.findById(objServicio.costo).exec((err, costoEncontrado)=>{
                    console.log('CHEKANDO CONTACTO!!!!');
                    if (!costoEncontrado){
                        return res.status(404).send({error: "El costo no existe en la base de datos"})
                    } else {
                        console.log('Se encontró el costo en la base de datos');  
                        existeCosto = true;
                    }
                    console.log('CONTACTO LISTO!!!!');
                    return resolve();
                });
            });
        }        
        
        buscandoEmpresa().then(buscandoConductor).then(buscandoUnidad).then(buscandoCosto).then(() => {
            if(existeEmpresa && existeConductor && existeUnidad && existeCosto){
                objServicio.save((err, servicioGuardado)=>{
                    if(err){
                        return res.status(500).send({error: "Error al intentar guardar el servicio en la base de datos: " + err});
                    }
                    if(!servicioGuardado){
                        return res.status(404).send({error: "Error al guardar el servicio en la base de datos: "+ err});
                    }
                    return res.status(200).send({saved: servicioGuardado});
                });
            }
        });
    },
    getServicioById:function(req, res){
        var idServicio = req.params.id;
        Servicio.findById(idServicio,(err, servicioEncontrado)=>{
            if(err){
                return res.status(500).send({error: "Error al intentar traer el servicio en la base de datos: " + err});
            }
            if(!servicioEncontrado){
                return res.status(404).send({error: "Error, No existe servicio con ese ID en la base de datos"});
            }
            return res.status(200).send({founded: servicioEncontrado});
        });
    },
    getAllServicios:function(req, res){
        Servicio.find().exec((err, serviciosEncontrados)=>{
            if(err){
                return res.status(500).send({error: "Error al intentar traer los servicios de la base de datos: " + err});
            }
            if(!serviciosEncontrados){
                return res.status(404).send({error: "Error, No existen servicios en la base de datos"});
            }
            return res.status(200).send({founded: serviciosEncontrados});
        });
    },
    updateServicioById:function(req, res){
        var idServicio = req.params.id;
        var parametrosNuevos = req.body;
        Servicio.findByIdAndUpdate(idServicio, parametrosNuevos, {new : true}, (err, servicioActualizado)=>{
            if(err){
                return res.status(500).send({error: "Error al intentar actualizar el servicio en la base de datos: " + err});
            }
            if(!servicioActualizado){
                return res.status(404).send({error: "Error, No existe servicio con ese ID en la base de datos"});
            }
            return res.status(200).send({updated: servicioActualizado});
        });
    },
    deleteServicioById:function(req, res){
        var idServicio = req.params.id;
        Servicio.findByIdAndRemove(idServicio,(err, servicioEliminado)=>{
            if(err){
                return res.status(500).send({error: "Error al intentar eliminar el servicio en la base de datos: " + err});
            }
            if(!servicioEliminado){
                return res.status(404).send({error: "Error, No existe servicio con ese ID en la base de datos"});
            }
            return res.status(200).send({deleted: servicioEliminado});
        });
    }
};

module.exports = servicioController;