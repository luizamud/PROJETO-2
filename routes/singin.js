var express = require('express');
var router = express.Router();
var client = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('singin');
});
router.post('/valid', (req, res) => {
    var usuario = req.body.username;
    var nome = req.body.name;
    var correio = req.body.email;
    var endereco = req.body.address;
    var senha = req.body.password;
    var cargo = 'member';

    var documento = {
        username: usuario,
        name: nome,
        email: correio,
        address: endereco,
        password: senha,
        office: cargo
    };

   
});
module.exports = router;