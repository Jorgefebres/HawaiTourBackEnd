'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var empresa = mongoose.model('empresa');
var conductor = mongoose.model('conductor');
var unidad = mongoose.model('unidad');
var costo = mongoose.model('costo');

var servicioSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    empresa :{
        type: Schema.Types.ObjectId,
        ref : 'empresa'
    },
    fecha: {
        type : Date,
        required : true
    },
    horaReserva:{
        type : Date,
        required : true
    },
    horaLlegada:{
        type : Date
    },
    horaInicio:{
        type: Date,
        default: Date.now
    },
    horaFin:{
        type: Date,
        default: Date.now
    },
    turno:{
        type: String
    },
    calidadServicio:{
        type:String
    },
    observacion:{
        type:String
    },
    conductor:{
        type: Schema.Types.ObjectId,
        ref : 'conductor'
    },
    unidad:{
        type: Schema.Types.ObjectId,
        ref : 'unidad'
    },
    costo :{
        type : Schema.Types.ObjectId,
        ref : 'costo'
    }
});
module.exports = mongoose.model('servicio', servicioSchema);