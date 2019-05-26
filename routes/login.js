var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login');
});
router.post('/valid', (req,res)=>{

});
module.exports = router;
