'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productoSchema = new Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    nombre:{
        type : String
    },
    precio:{
        type : SchemaTypes.Double,
        },    
    categoria : {
        type : Schema.Types.ObjectId,
        ref : 'categoria'
    }
});

module.exports = mongoose.model('categoria', categoriaSchema);