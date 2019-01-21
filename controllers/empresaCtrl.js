'use strict';

var Empresa = require('../models/empresa');
var Direccion = require('../models/direccion');
var Contacto = require('../models/contacto');

var empresaController ={
    home: function(req, res){
        return res.status(200).send({mensaje: "Home del controlador Empresa!!!"});
    },
    createEmpresa: function (req, res){
        var objEmpresa = new Empresa();
        var params = req.body;
        
        var existeContacto = false;
        var existeDireccion = false;
        
        // objEmpresa._id = params._id;
        objEmpresa.nombre = params.nombre;
        objEmpresa.contacto = params.contacto;
        objEmpresa.direccion = params.direccion;
        
        console.log('Recibido: ', objEmpresa.nombre, objEmpresa.contacto, objEmpresa.direccion);
        
        //IMPLEMENTAMOS PROMESAS PARA PODER HACER ASINCRONOS LOS PROCESOS DE BUSQUEDA DE DIRECCION y
        //CONTACTO para FINALMENTE GUARDAR SI EXISTEN DATOS VALIDOS EN LA BASE DE DATOS
        let buscandoDireccion = () => {
            return new Promise(function(resolve,reject){
                Direccion.findById(objEmpresa.direccion).exec((err, direccionEncontrada)=>{
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
                Contacto.findById(objEmpresa.contacto).exec((err, contactoEncontrado)=>{
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
        buscandoDireccion().then(buscandoContacto).then(() => {
            if(existeContacto && existeDireccion){
                console.log('GUARDANDO EMPRESA!!!!');
                objEmpresa.save((err, empresaGuardada)=>{            
                    if(err){
                        return res.status(500).send({error : "Error al guardar la empresa en la base de datos: " + err});
                    }
                    if(!empresaGuardada){
                        return res.status(404).send({ error : "Error mientras se guardaba la empresa en la base de datos: " + err})
                    }
                    return res.status(200).send({ saved : empresaGuardada});
                });      
            }
            else{
                console.log('SALTEÓ GUARDANDO EMPRESA!!!!');
            }
        });
    },
    getEmpresaById : function (req, res){
        var id = req.params.id;
        
        console.log('id recibido: ', id);
        Empresa.findById(id, (err, empresa)=>{
            if(err){
                return res.status(500).send({ error : "Error al traer la empresa " + err});
            }
            if(!empresa){
                return res.status(404).send({ error : "No se encontró ninguna empresa con ese id en la base de datos"});
            }
            return res.status(200).send({ found : empresa});
        });
    },
    getAllEmpresas : function (req, res){
        Empresa.find().exec((err, empresas)=>{
            if(err){
                return res.status(500).send({ error : "Error al traer las empresas de la base de datos"});
            }
            if(!empresas){
                return res.status(404).send({ error : "Error, No existen empresas en la base de datos"});
            }
            return res.status(200).send({ empresasEncontradas : empresas});
        })
    },
    updateEmpresaById: function(req, res){
        var id = req.params.id;
        var parametrosNuevos = req.body;
        console.log('Id Recibido: ', id);
        
        Empresa.findByIdAndUpdate(id, parametrosNuevos, { new : true}, (err, empresaActualizada)=>{
            if(err){
                return res.status(500).send({ error : "Error al intentar actualizar la empresa" + err});
            }
            if(!empresaActualizada){
                return res.status(404).send({ error : "Error, No existe esa empresa en la base de datos"});
            }
            return res.status(200).send({ updated : empresaActualizada});
        });
    },
    deleteEmpresaById : function (req, res){
        var empresaId = req.params.id;
        Empresa.findByIdAndRemove(empresaId,(err, empresaEliminada)=>{
            if(err){
                return res.status(500).send({error : "Error al eliminar la empresa" + err});
            }
            if(!empresaEliminada){
                return res.status(404).send({ error : "Error, la empresa no existe en la base de datos"});
            }
            return res.status(200).send({deleted : empresaEliminada});
        });
    }
};

module.exports = empresaController;