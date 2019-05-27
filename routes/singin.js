var express = require('express');
var router = express.Router();
var client = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('singin');
});
router.post('/valid', (req, res) => {
    var user = req.body.username;
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;
    var password = req.body.password;
    var office = 'member';

    var documento = ({ user: user, name: name, email: email, address: address, password: password, office: office });
    
    console.log(`Usuario: ${user}\nNome: ${name}\nE-mail: ${email}\nEndereço: ${address}\nSenha: ${password}\nCargo: ${office}`);
    //  Inicia o Banco
    client.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) throw err;
        if (!err) {
            let banco = client.db('novelmania');
            //Consulta Banco!
            banco.collection('novelmania').findOne({user: user}, (err, database) => {
                var tempuser = database.user;
                var tempemail = database.email;
                if (err) {
                    console.log(err);
                }
                if (!err) {

                    console.log("consultado");

                    if (tempuser == user) {
                        res.render('singin', { userError: "Usuario existente" });
                        if (tempemail == email) {
                            console.log("erro");
                            res.render('singin', { emailError: "E-mail existente" });
                        } else {
                            banco.collection('novelmania').insertOne(documento, (err) => {
                                if (err) throw err;
                                if (!err) {
                                    res.cookie("userData", documento);
                                    console.log('Cookie Adicionado');
                                    res.redirect('/member');
                                }
                            });
                        }
                    }



                }
            });
        }
    });

});
module.exports = router;
