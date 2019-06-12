var express = require('express');
var router = express.Router();
var client = require('mongodb').MongoClient;
const url = "mongodb+srv://dbUser:dbUserPassword@cluster0-1sqfq.mongodb.net/test?retryWrites=true&w=majority";/* GET home page. */
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

    var documento = {
        username: usuario,
        name: nome,
        email: correio,
        address: endereco,
        password: senha,
        office: cargo
    };
    console.log(documento);
    client.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) throw err;
        /**
         * No caso com o mongo e o driver mongo a resposta para se cadastrar e simples,
         * se nao tiver o registro dentro do banco se responde null ou seja
         * if(result != null) => Aqui se tiver algo no banco ele devolve uma call back de erro direto pro hbs
         * if(result == null) => Quer dizer que se nao tiver nada no banco pode cadastrar
         * usar findMany & insertMany para nao haver conflito entre os saves
         */
        if (!err) {
            var db = client.db('novelmania');
            db.collection('user').findMany({ username: usuario }, (err, result) => {
                if (err) throw err;
                if (!err) {
                    if (result == null) {
                        db.collection('user').insertMany(documento, (err) => {
                            if (err) throw err;
                            if (!err) {
                                res.redirect('/login');
                                res.cookie('NewUser', documento);
                                client.close();
                            }
                        });
                    }
                    if (result != null) {
                        client.close();
                        console.log(result);
                        res.render('singin', { userError: "E-mail ou Usuario ja cadastrados" });
                    }

                }
            });
        }
    });


});
module.exports = router;