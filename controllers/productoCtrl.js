'use strict';

var productoController = {
    home: function (req, res){
        return res.status(200).send({message : "Home del controlador producto!!!"});
    },
}
module.exports = productoController;