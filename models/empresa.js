'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var contacto = mongoose.model('contacto');
var direccion = mongoose.model('direccion');

var empresaSchema = new Schema({
    // _id : mongoose.Schema.Types.ObjectId,
    nombre : {
        type: String,
        unique : true,
        //para asegurarnos que no guarde el registro en caso de repetirse el nombre de la empresa
        dropDups: true,
        required : true
    },    
    contacto : {
        type : Schema.Types.ObjectId,
        ref : 'contacto'
    },
    direccion : {
        type : Schema.Types.ObjectId,
        ref : 'direccion'
    }
});

module.exports = mongoose.model('empresa', empresaSchema);