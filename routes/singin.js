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

    var documento = {
        username: usuario,
        name: nome,
        email: correio,
        address: endereco,
        password: senha,
        office: cargo
    };

    client.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) throw err;
        if (!err) {
            var db = client.db('novelmania');
            db.collection('user').findOne({ username: usuario }, (err, result) => {
                if (err) throw err;
                if(result == null){
                    console.log("em branco"+result);
                }
                if (!err) {

                    var json = JSON.stringify(result);
                    var temp = JSON.parse(json);
                    console.log(json,temp);
                    
                    if ((temp.username != usuario) && (temp.password != senha)) {
                        banco.collection('user').insertOne(documento, (err) => {
                            if (err) throw err;
                            if (!err) {
                                console.log(`Salvo no Banco\nCookies adicionados`);
                                res.cookie("CurrentUser", documento);
                                client.close();
                                res.redirect('/login');
                            }
                        });
                    } else {
                        console.log("usuario ja cadastrado");
                        res.render('singin', { userError: "Email / Usuario existentes" });
                        client.close();
                        //fecha o banco
                    }

                }

            });
        }

    });
});
module.exports = router;