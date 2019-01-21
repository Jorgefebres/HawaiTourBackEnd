'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriaSchema = new Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    nombre:{
        type : String
    },
    descripcion:{
        type : String
    }
});

module.exports = mongoose.model('categoria', categoriaSchema);