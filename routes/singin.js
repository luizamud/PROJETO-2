var express = require('express');
var router = express.Router();
var client = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('singin');
});
router.post('/valid', (req, res) => {
    var usuario = req.body.username;
    var nome = req.body.name;
    var correio = req.body.email;
    var endereco = req.body.address;
    var senha = req.body.password;
    var cargo = 'member';
    var query = { username: usuario }
    var documento = { username: usuario, name: nome, email: correio, address: endereco, password: senha, office: cargo };

    client.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) throw err;
        if (!err) {
            let banco = client.db('novelmania');
            //Consulta Banco!
            banco.collection('user').findOne(query, (err, result) => {
                var tempemail = result.email;
                var tempuser = result.username
                if (err) throw err;

                if (!err) {
                    if ((tempuser != usuario) && (tempemail != correio)) {
                        banco.collection('user').insert(documento, (err, result) => {
                            if (err) throw err;
                            if (!err) {
                                console.log("Salvo no banco");
                                console.log(result);
                            }
                        });
                    } else {
                        console.log("usuario ja cadastrado");
                        res.render('singin', { userError: "Email / Usuario existentes" });
                        client.close();
                    }

                }

            });
        }


    });
});
module.exports = router;

