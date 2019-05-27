var express = require('express');
var router = express.Router();
var client = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login');
});
router.post('/valid', (req,res)=>{
    var usuario = req.body.username;
    var senha = req.body.password;
    var query = {username: usuario,password: senha};
    client.connect(url,{useNewUrlParser: true},(err,client)=>{
        if (err) throw err;
        var db = client.db('novelmania');
        db.collection('user').findOne(query,(err,result)=>{
            if(err) throw err;
            if(!err){
                if(result == null){
                    res.render('login',{erroLogin: "Usuario ou Senha Inexistente"});
                }
            }
        });

    });
});
module.exports = router;
