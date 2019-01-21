'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactoSchema = new Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    tipo:{
        type : String
    },
    numero:{
        type : String
    },
    numero2:{
        type : String
    }
});

module.exports = mongoose.model('contacto', contactoSchema);