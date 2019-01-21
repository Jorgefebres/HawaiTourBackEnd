'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var unidadSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    placa : {
        type : String,
        unique : true,
        dropDups: true,
        required : true
    },
    categoria :{
        type : String
    },
    marca : {
        type : String
    },
    modelo : {
        type : String
    },
    color : {
        type : String
    },
    anio : {
        type : Date
    },
    ultimoITV:{
        type : Date
    },
    proximoITV : {
        type: Date
    },
    estado : {
        type : String
    },
    vencimientoSOAT : {
        type : Date
    },
    ingreso : {
        type : String
    }

});

module.exports = mongoose.model('unidad', unidadSchema);