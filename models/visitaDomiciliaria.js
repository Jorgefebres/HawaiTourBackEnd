'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var contacto = mongoose.model('contacto');

var visitaDomiciliaraSchema = new Schema({
    // _id : mongoose.Schema.Types.ObjectId,
    informe:{
        type : String
    },
    fecha:{
        type : Date
    },
    contacto:{
        type : Schema.Types.ObjectId,
        ref : "contacto"
    }
});

module.exports = mongoose.model('visitaDomiciliaria', visitaDomiciliaraSchema);