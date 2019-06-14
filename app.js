var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookie = require('cookie-parser');

// Fix Bug Heroku 
var porta = process.env.PORT || 8080;

//  Definindo a Engine de renderização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//  Definindo Sessoes e cookie
app.use(cookie());
//  Definindo Loggers e arquivos estaticos
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

//  Define as requisições de rotas
var home = require('./routes/home');
var login = require('./routes/login');
var singin = require('./routes/singin');
var member = require('./routes/member')

//  Define as rotas
app.use('/', home);
app.use('/login', login);
app.use('/singin', singin);
app.use('/member', member);



//  Propriedade do HTTP ERRORS
app.use(function (req, res, next) {
    next(createError(404));
});

//  Propriedade para tratamento de erro do HTTP ERRORS (LOGGER)
app.use(function (err, req, res, next) {
    // set locals, only providing error in development  
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(porta, (err) => {
    if (!err) {
        console.log(`Server => ON\nPort => ${porta}`);
    }
});

