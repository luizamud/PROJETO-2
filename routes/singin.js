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

    client.connect(url, {
        useNewUrlParser: true
    }, (err, client) => {
        if (err) throw err;
        if (!err) {
            var banco = client.db('novelmania');
            //Consulta Banco!
            banco.collection('user').findOne({
                username: usuario
            }, (err, result) => {
                if (err) throw err;
                if (!err) {
                    if (result == null) {
                        banco.collection('user').insertOne(documento, (err) => {
                            if (err) throw err;
                            if (!err) {
                                console.log("Salvo no banco");
                                client.close();
                            }
                        });
                    } else {
                        console.log("usuario ja cadastrado");
                        res.render('singin', {
                            userError: "Email / Usuario existentes"
                        });
                        client.close();
                        //fecha o banco

                    }

                }

            });
        }

    });
});
module.exports = router;