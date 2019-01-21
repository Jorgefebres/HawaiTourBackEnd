'use strict';

var Costo = require('../models/costo');

var costoController = {
    home:function(req, res){
        return res.status(200).send({ mensaje : "Home del controlador de costo"});
    },
    createCosto:function(req, res){
        var objCosto = new Costo();
        var params = req.body;

        objCosto.tarifa = params.tarifa;
        objCosto.tiempoEspera = params.tiempoEspera;
        objCosto.peaje = params.peaje;
        objCosto.estacionamiento = params.estacionamiento;
        objCosto.total = params.estacionamiento;

        objCosto.save((err, costoGuardado)=>{
            if(err){
                return res.status(500).send({ error : "Error al guardar el costo en la base de datos"+ err});
            }
            if(!costoGuardado){
                return res.status(404).send({ error : "Error, no se pudo guardar el costo" + err});
            }
            return res.status(200).send({saved : costoGuardado});
        });
    },
    getCostoById:function(req, res){
        var id = req.params.id;
        Costo.findById(id,(err, costoEncontrado)=>{
            if(err){
                return res.status(500).send({ error : "Error al traer el costo en la base de datos"+ err});
            }
            if(!costoEncontrado){
                return res.status(404).send({ error : "Error, no existe ese costo en la base de datos"});
            }
            return res.status(200).send({found : costoEncontrado});
        });
    },
    getAllCostos:function(req, res){
        Costo.find().exec((err, costosEncontrados)=>{
            if(err){
                return res.status(500).send({ error : "Error al traer los costos en la base de datos"+ err});
            }
            if(!costosEncontrados){
                return res.status(404).send({ error : "Error, existen costos en la base de datos"});
            }
            return res.status(200).send({found : costosEncontrados});
        });
    },
    updateCostoById:function (req, res){
        var id = req.params.id;
        var parametrosNuevos = req.body;

        Costo.findByIdAndUpdate(id, parametrosNuevos, { new : true}, (err, costoActualizado)=>{
            if(err){
                return res.status(500).send({ error : "Error al actualizar los costos en la base de datos"+ err});
            }
            if(!costoActualizado){
                return res.status(404).send({ error : "Error, no existe ese costo en la base de datos"});
            }
            return res.status(200).send({updated : costoActualizado});
        });
    },
    deleteCostoById: function(req, res){
        var id = req.params.id;

        Costo.findByIdAndRemove(id,(err, costoEliminado)=>{
            if(err){
                return res.status(500).send({ error : "Error al eliminar los costos en la base de datos"+ err});
            }
            if(!costoEliminado){
                return res.status(404).send({ error : "Error, no existe ese costo en la base de datos"});
            }
            return res.status(200).send({deleted : costoEliminado});
        });
    }
};

module.exports = costoController;