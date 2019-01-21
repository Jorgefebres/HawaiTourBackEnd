'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var crypto = require('crypto');
// var jwt = require('jsonwebtoken');

var direccionSchema = new Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    descripcion:{
        type : String,
        require : true
    },
    distrito:{
        type : String,
        require : true
    },
    tipo : {
        type : String
    }

});

module.exports = mongoose.model('direccion', direccionSchema);
