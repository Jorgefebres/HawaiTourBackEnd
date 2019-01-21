'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var direccion = mongoose.model('direccion');
var contacto = mongoose.model('contacto');
var familiar = mongoose.model('familiar');
var visitaDomiciliaria = mongoose.model('visitaDomiciliaria')

// var crypto = require('crypto');
// var jwt = require('jsonwebtoken');

var conductorSchema = new Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    codigo:{        
        type: String,
        unique:true,
        required:true
    },
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    fechaNacimiento:{
        type: Date,
    },
    vencimientoContrato:{
        type: Date,
        required: true
    },
    vencimientoBrevette:{
        type: Date,
        required: true
    },
    examenMedico:{
        type: Date,
        required: true
    },
    direccion: { 
        type: Schema.Types.ObjectId,
        ref: "direccion"
    },
    contacto: { 
        type: Schema.Types.ObjectId,
        ref: "contacto"
    },
    familiar: { 
        type: Schema.Types.ObjectId, 
        ref: "familiar"
    },
    visitaDomiciliaria: { 
        type: Schema.Types.ObjectId, 
        ref: "visitaDomiciliaria"
    }  
});

module.exports = mongoose.model('conductor', conductorSchema);