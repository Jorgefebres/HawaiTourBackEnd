'use strict';

var Unidad = require('../models/unidad');
var unidadController={
    home: function(req, res){
        return res.status(200).send({ message : "Home del controlador Unidad!!!"});    
    },
    createUnidad:function(req, res){
        var objUnidad = new Unidad();
        var params = req.body;

        objUnidad.placa = params.placa;
        objUnidad.categoria = params.categoria;
        objUnidad.marca = params.marca;
        objUnidad.modelo = params.modelo;
        objUnidad.color = params.color;
        objUnidad.anio = params.anio;
        objUnidad.ultimoITV = params.ultimoITV;
        objUnidad.proximoITV = params.proximoITV;
        objUnidad.estado = params.estado;
        objUnidad.vencimientoSOAT = params.vencimientoSOAT;
        objUnidad.ingreso = params.ingreso;

        objUnidad.save((err, unidadGuardada)=>{
            if(err){
                return res.status(500).send({ error : "Error al intentar guardar la unidad en la base de datos"+ err});
            }
            if(!unidadGuardada){
                return res.status(404).send({ error : "Error al intentar guardar la unidad"+ err})
            }
            return res.status(200).send({ saved : unidadGuardada});
        });
    },
    getUnidadById:function(req, res){
        var id = req.params.id;
        Unidad.findById(id, (err, unidadEncontrada)=>{
            if(err){
                return res.status(500).send({ error : "Error al traer la unidad de la base de datos"+ err});
            }
            if(!unidadEncontrada){
                return res.status(404).send({ error : "Error, no existe la unidad en la base de datos"})
            }
            return res.status(200).send({ found : unidadEncontrada});
        });
    },
    getAllUnidades:function(req, res){
        Unidad.find().exec((err, unidadesEncontradas)=>{
            if(err){
                return res.status(500).send({ error : "Error al traer las unidades de la base de datos"+ err});
            }
            if(!unidadesEncontradas){
                return res.status(404).send({ error : "Error, no existen unidades en la base de datos"})
            }
            return res.status(200).send({ found : unidadesEncontradas});
        }); 
    },
    updateUnidadById:function(req, res){
        var id = req.params.id;
        var parametrosNuevos = req.body;

        Unidad.findByIdAndUpdate(id, parametrosNuevos, {new : true }, (err, unidadActualizada)=>{
            if(err){
                return res.status(500).send({ error : "Error al actualizar la unidad de la base de datos"+ err});
            }
            if(!unidadActualizada){
                return res.status(404).send({ error : "Error, no existe esa unidad en la base de datos"});
            }
            return res.status(200).send({ updated : unidadActualizada});
        }); 
    },
    deleteUnidadById:function(req, res){
        var id = req.params.id;

        Unidad.findByIdAndRemove(id, (err, unidadEliminada)=>{
            if(err){
                return res.status(500).send({ error : "Error al eliminar la unidad de la base de datos"+ err});
            }
            if(!unidadEliminada){
                return res.status(404).send({ error : "Error, no existe esa unidad en la base de datos"});
            }
            return res.status(200).send({ deleted : unidadEliminada});
        }); 
    },    
};

module.exports = unidadController;