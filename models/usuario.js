'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var empresa = mongoose.model('empresa');
var direccion = mongoose.model('direccion');
var contacto = mongoose.model('contacto');

var usuarioSchema = new Schema({
    // _id : mongoose.Schema.Types.ObjectId,
    nombre:{
        type:String,
        require: true
    },
    apellido:{
        type: String,
        require : true
    },
    empresa:{
        type : Schema.Types.ObjectId,
        ref : "empresa"
    },
    direccion:{
        type : Schema.Types.ObjectId,
        ref : "direccion"
    },
    contacto:{
        type : Schema.Types.ObjectId,
        ref : "contacto"
    }
});
module.exports = mongoose.model('usuario', usuarioSchema);