'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var costoSchema = new Schema({
    // _id : mongoose.Schema.Types.ObjectId,
    tarifa : {
        type : Schema.Types.Decimal128,
        required : true
    },
    tiempoEspera:{
        type : Date
    },
    peaje : {
        type : Schema.Types.Decimal128
    },
    estacionamiento : {
        type : Schema.Types.Decimal128
    },
    total : {
        type : Schema.Types.Decimal128
    }
});

module.exports = mongoose.model('costo', costoSchema);