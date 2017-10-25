var express = require('express');
var app = express();
var cors = require('cors');
var music_crawler = require('./api/music_crawler.js');
var beauty_crawler = require('./api/beauty_crawler.js');
var pttbeauty_home = require('./api/pttbeauty_home.js');
//beauty_crawler(pttbeauty_home());
app.use(cors());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


app.get('/api/music', function(req, res) { 
    res.send(music_crawler());
})

app.get('/api/beauty', function(req, res) { 
  var data = beauty_crawler(req.query.page);
  if(data !== undefined && data.length > 2) {
    res.send(data);
  }
  else {
    setTimeout(function(){
      res.send(beauty_crawler(req.query.page));
    }, 2500);
  }
})

app.get('/api/beauty/home', function(req, res) { 
  res.send(pttbeauty_home());
})