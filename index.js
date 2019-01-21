'use strict'

var mongoose = require ('mongoose');
var app = require('./app');
var puerto = 3700;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/hawaitour')
        .then(()=>{
            console.log("Conexion con la base de datos HawaiTour exitosa!!");
            app.listen(puerto,()=>{
                console.log("Servidor corriendo perfectamente => localhost:3700");
            });
        }).catch(err=>{
            console.log("Error: " + err);
        });