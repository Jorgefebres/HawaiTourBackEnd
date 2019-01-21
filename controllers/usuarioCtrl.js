'use strict';

var Usuario = require('../models/usuario');
var Empresa = require ('../models/empresa');
var Direccion = require('../models/direccion');
var Contacto = require('../models/contacto');

var usuarioController = {
    home: function (req , res){
        return res.status(200).send({ message : "Home del controlador usuario"});
    },
    createUsuario:function(req, res){
        var objUsuario = new Usuario();
        var params = req.body;
        
        var existeEmpresa = false;
        var existeDireccion = false;
        var existeContacto = false;
        
        objUsuario.nombre = params.nombre;
        objUsuario.apellido = params.apellido;
        objUsuario.empresa = params.empresa;
        objUsuario.direccion = params.direccion;
        objUsuario.contacto = params.contacto;
        
        
        let buscandoEmpresa= () => {
            return new Promise(function(resolve,reject){
                Empresa.findById(objUsuario.empresa).exec((err, empresaEncontrada)=>{
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
        let buscandoDireccion = () => {
            return new Promise(function(resolve,reject){
                Direccion.findById(objUsuario.direccion).exec((err, direccionEncontrada)=>{
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
                Contacto.findById(objUsuario.contacto).exec((err, contactoEncontrado)=>{
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
        buscandoEmpresa().then(buscandoDireccion).then(buscandoContacto).then(() => {
            if(existeEmpresa && existeDireccion && existeContacto){
                objUsuario.save((err, usuarioGuardado)=>{
                    if(err){
                        return res.status(500).send({ error : "Error al guardar el usuario en la base de datos: " + err});
                    }
                    if(!usuarioGuardado){
                        return res.status(404).send({ error : "Error, no se pudo guardar el usuario" + err});
                    }
                    return res.status(200).send({ saved : usuarioGuardado});
                });
            }
        });
    },
    getUsuarioById: function(req, res){
        var id = req.params.id;
        Usuario.findById(id, (err, usuarioEncontrado)=>{
            if(err){
                return res.status(500).send({ error : "Error al traer el usuario de la base de datos: "+ err});
            }
            if(!usuarioEncontrado){
                return res.status(404).send({ error : "Error, No existe ese usuario en la base de datos"});
            }
            return res.status(200).send({ found : usuarioEncontrado});
        });
    },
    getAllUsuarios:function(req , res){
        Usuario.find().exec((err, usuariosEncontrados)=>{
            if(err){
                return res.status(500).send({ error : "Error al traer los usuarios de la base de datos: " + err});
            }
            if(!usuariosEncontrados){
                return res.status(404).send({ error : "Error, no existen usuarios en la base de datos"});
            }
            return res.status(200).send({found : usuariosEncontrados});
        })
    },
    updateUsuarioById:function(req, res){
        var id = req.params.id;
        var parametrosNuevos = req.body;
        Usuario.findByIdAndUpdate(id, parametrosNuevos, { new : true },(err, usuarioActualizado)=>{
            if(err){
                return res.status(500).send({ error : "Error al actualizar el usuario: " + err});
            }
            if(!usuarioActualizado){
                return res.status(404).send({ error : "Error, no existe el usuario en la base de datos"});
            }
            return res.status(200).send({ updated : usuarioActualizado});
        })
    },
    deleteUsuarioById:function(req, res){
        var id = req.params.id;
        Usuario.findByIdAndRemove(id,(err, usuarioEliminado)=>{
            if(err){
                return res.status(500).send({error : "Error al intentar eliminar el usuario de la base de datos: " + err});
            }
            if(!usuarioEliminado){
                return res.status(404).send({error : "Error, no existe ese usuario en la base de datos"});
            }
            return res.status(200).send({deleted : usuarioEliminado});
        });
    }
};

module.exports = usuarioController;