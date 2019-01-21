'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var contacto = mongoose.model('contacto');


var familiarSchema = new Schema ({
    //_id:mongoose.Schema.Types.ObjectId,
    nombre:{
        type : String,
        require : true
    },
    tipoParentezco:{
        type : String,
        require : true
    },
    contacto : {
        type : Schema.Types.ObjectId,
        ref : "contacto"
    }
});

module.exports = mongoose.model('familiar', familiarSchema);