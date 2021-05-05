const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

nunjucks.configure('view', {
    autoescape: true,
    express: app
});

app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) {
    res.render('chessMax.html');
});

app.listen(3000, console.log('Chess is up and running on Port 3000'));
