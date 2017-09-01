var express = require('express');
var bodyParser = require('body-parser');
var userRouter = require('./src/routes/users');
var indexRouter = require('./src/routes/index');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/Users', userRouter);

var port = process.env.PORT || 3000;

app.listen(port, function (err) {
  console.log('Listen port: ' + port);
});
