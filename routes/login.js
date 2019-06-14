var express = require('express');
var router = express.Router();
var client = require('mongodb').MongoClient;
const url = "mongodb+srv://dbUser:dbUserPassword@cluster0-1sqfq.mongodb.net/test?retryWrites=true&w=majority";/* MongoString: User=> dbUser && Password=> dbUserPassword */



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login');
});
router.post('/valid', (req, res) => {
    var usuario = req.body.username;
    var senha = req.body.password;


    client.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) throw err;
        if (!err) {
            var db = client.db('novelmania');
            db.collection('user').findOne({ username: usuario }, (err, result) => {
                
                if (err) throw err;
                if (!err) {
                    var json = JSON.stringify(result);
                    var temp = JSON.parse(json);
                    console.log(temp);
                    if ((temp.username == usuario) && (temp.password == senha)) {
                       
                        res.redirect('/member');
                        client.close();


                    } else {
                        res.render('login', { erroLogin: "Usuario ou senha INCORRETO" });
                        client.close();
                    }

                }
            });
        }
    });
});
module.exports = router;
