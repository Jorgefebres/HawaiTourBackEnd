'use strict'

var VisitaDomiciliaria = require('../models/visitaDomiciliaria');

var visitaDomiciliariaController = {
    home : function( req, res) {
        return res.status(200).send({ mensaje : "Home del controlador de Visita Domiciliaria!!!"});
    },
    createVisitaDomiciliaria( req , res){
        var objVisitaDomiciliaria = new VisitaDomiciliaria();
        var params = req.body;
        
        objVisitaDomiciliaria.informe = params.informe;
        objVisitaDomiciliaria.fecha = params.fecha;
        
        objVisitaDomiciliaria.save((err, visitaDomiciliariaGuardada)=>{
            if(err){
                return res.status(500).send({ error : "Error al guardar la visita en la base de datos: " + err});
            }
            if(!visitaDomiciliariaGuardada){
                return res.status(404).send({ error : "Error mientras se guardaba el registro en la base de datos: " + err});
            }
            return res.status(200).send({ saved : visitaDomiciliariaGuardada});
        });
    },
    getVisitaDomiciliaria( req, res){
        var id = req.params.id;
        
        console.log('Id Recibido: ', id);
        VisitaDomiciliaria.findById(id, (err,visitaDomiciliariaRecibida)=>{
            if(err){
                return res.status(500).send({ error : "Error al traer la visita de la base de datos:" + err});
            }
            if(!visitaDomiciliariaRecibida){
                return res.status(404).send({ error : "Error, no existe esa visita en la base de datos:"});
            }
            return res.status(200).send({ found: visitaDomiciliariaRecibida});
        });
    },
    getAllVisitasDomiciliarias(req, res){
        VisitaDomiciliaria.find().exec((err, visitasDomiciliarias)=>{
            if(err){
                return res.status(500).send({ error : "Error al traer las visitas de la base de datos: " + err});
            }
            if(!visitasDomiciliarias){
                return res.status(404).send({ error : "Error: No se encontraron visitas en la base de datos"});
            }
            return res.status(200).send({ found : visitasDomiciliarias});
        });
    },
    updateVisitaDomiciliaria(req, res){
        var id = req.params.id;
        var parametrosNuevos = req.body;

        console.log('Id Recibido' , id);

        VisitaDomiciliaria.findByIdAndUpdate(id, parametrosNuevos, { new : true }, (err, visitaDomiciliariaActualizada)=>{
            if(err){
                return res.status(500).send({ error : "Error al actualizar la visita: " + err});
            }
            if(!visitaDomiciliariaActualizada){
                return res.status(404).send({ error : "Error, No existe esa visita en la base de datos"});
            }
            return res.status(200).send({updated : visitaDomiciliariaActualizada});
        })
    },
    deleteVisitaDomiciliaria(req, res){
        var id = req.params.id;
        VisitaDomiciliaria.findByIdAndRemove(id,(err, visitaDomiciliariaEliminada)=>{
            if(err){
                return res.status(500).send({error : "Error al eliminar la visita " + err});
            }
            if(!visitaDomiciliariaEliminada){
                return res.status(404).send({error : "Error, la visita no existe en la base de datos"});
            }
            return res.status(200).send({ deleted : visitaDomiciliariaEliminada});
        });
    }    
};

module.exports = visitaDomiciliariaController;