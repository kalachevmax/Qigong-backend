

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(cors({exposedHeaders: 'Authorization'}));


/**
 * @enum {number}
 */
var UserRole = {
  ANONYMOUS: 1,
  ADMIN: 2
};


var users = {
  'admin': {
    password: '123123',
    role: UserRole.ADMIN
  }
};


var quotes = [
  'Истинная доброта как вода - питает всё, но ничего не захватывает...',
  'Дао, которое может быть выражено словами, не есть постоянное дао',
  'Не дорожите труднодоступными вещами и сердце ваше будет свободно',
  'Много слов - много бед. Не лучше ли соблюдать середины?',
  'Дао пусто, но в своём применении оно неисчерпаемо'
];


var news = [
  {date: new Date(2014, 9, 10), address: 'Галерная, 37', text: 'Цигун - семинар для начинающих (подготовительный цигун)'},
  {date: new Date(2014, 9, 17), address: 'Галерная, 37', text: 'Цигун - семинар "Воин Духа"'}
];


/**
 * @return {string}
 */
function generateToken() {
  return Math.random().toString(16).substr(2);
}


app.post('/auth', function(request, response) {
  var login = request.body['login'] || '';
  var password = request.body['password'] || '';

  if (users[login] !== undefined && users[login].password === password) {
    response.setHeader('Authorization', generateToken());
    response.json(200, {role: users[login].role});
  } else {
    response.send(401);
  }
});


app.get('/', function(request, response) {
  response.send('Hello');
});


app.get('/random-quote', function(request, response) {
  var index = Math.floor(quotes.length * Math.random());
  response.send(quotes[index]);
});


app.get('/news', function(request, response) {
  response.send(JSON.stringify(news));
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
