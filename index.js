

var express = require('express');
var app = express();


app.set('port', (process.env.PORT || 7001));
app.use(express.static(__dirname + '/public'));


var quotes = [
  'Истинная доброта как вода - питает всё, но ничего не захватывает...',
  'Дао, которое может быть выражено словами, не есть постоянное дао',
  'Не дорожите труднодоступными вещами и сердце ваше будет свободно'
];


var news = [
  {date: new Date(2014, 9, 10), address: 'Галерная, 37', text: 'Цигун - семинар для начинающих (подготовительный цигун)'},
  {date: new Date(2014, 9, 17), address: 'Галерная, 37', text: 'Цигун - семинар "Воин Духа"'}
];


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
