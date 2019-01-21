'use strict';

var Direccion = require("../models/direccion");

var direccionController = {
    home : function (req, res){
        return res.status(200).send({ mensaje : "Home del controlador Direccion!!!"});
    },
    createDireccion : function (req, res){
        var objDireccion = new Direccion();
        var params = req.body;

        // objDireccion._id = params._id;
        objDireccion.descripcion = params.descripcion;
        objDireccion.distrito = params.distrito;
        objDireccion.tipo = params.tipo;
        
        console.log('recibido: ', objDireccion.descripcion, objDireccion.distrito, objDireccion.tipo);
        
        objDireccion.save((err, direccionGuardada)=>{
            if(err){
                return res.status(500).send({error : "Error al guardar la direccion " + err});
            }
            if(!direccionGuardada){
                return res.status(404).send({error: "Error al intentar guardar la direccion"});
            }
            return res.status(200).send({saved: direccionGuardada});
        });
    },
    getDireccionById : function (req, res){
        var id = req.params.id;

        console.log('id Recibido: ', id);
        Direccion.findById(id, (err, direccionRecibida)=>{
            if(err){
                return res.status(500).send({ error: "Error al cargar la direccion" + err});
            }
            if(!direccionRecibida){
                return res.status(404).send({ error : "Error, el proyecto no se encuentra en la base de datos"});
            }
            return res.status(200).send({ founded : direccionRecibida});
        });
    },
    getAllDirecciones:function(req, res){
        Direccion.find().exec((err, direcciones)=>{
            if(err){
                return res.status(500).send({ error : "Error al traer las direcciones de la base de datos " + err });
            }
            if(!direcciones){
                return res.status(404).send({ error : "Error, No existen direcciones en la base de datos"});
            }
            res.status(200).send({adresses : direcciones});
        });
    },
    updateDireccionById: function(req, res){
        var nuevosParametros = req.body;
        var direccionId = req.params.id;

        Direccion.findByIdAndUpdate(direccionId, nuevosParametros, { new : true} , ( err, direccionActualizada)=>{
            if(err){
                return res.status(500).send({error : "ERROR al intentar actualizar la direccion " + err});
            }
            if(!direccionActualizada){
                return res.status(404).send({error : "ERROR, la direccion no existe en la base de datos"});
            }
            return res.status(200).send({updated : direccionActualizada});
        });
    },
    deleteDireccionById : function (req, res){
        var direccionId = req.params.id;
        Direccion.findByIdAndRemove(direccionId,(err, direccionEliminada)=>{
            if(err){
                return res.status(500).send({error : "Error al eliminar la direccion" + err});
            }
            if(!direccionEliminada){
                return res.status(404).send({ error : "Error, la direccion no existe en la base de datos"});
            }
            return res.status(200).send({deleted : direccionEliminada});
        });
    }

}

module.exports = direccionController;