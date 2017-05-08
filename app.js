const express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan'),
nunjucks = require('nunjucks'),
cors = require('cors'),
//maps = require('./public/js/map.js');
app = express();

app.use(express.static('public'));

var env = nunjucks.configure('public', { noCache: true });
app.engine('html', nunjucks.render);
app.set('views', __dirname + '/public');
app.set('view engine', 'html');

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.get('/', function(req, res, next){
  res.render('js/index')
  .catch(next)
})

app.post('/', function(req, res, next) {
  res.render('js/index')
  .catch(next)
})


app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send(err.message);
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
})
