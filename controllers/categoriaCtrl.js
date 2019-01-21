'use strict';

var categoriaController = {
    home: function (req, res){
        return res.status(200).send({message : "Home del controlador categoría!!!"});
    },
}
module.exports = categoriaController;