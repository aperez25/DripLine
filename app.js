const express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan'),
nunjucks = require('nunjucks'),
cors = require('cors');
let app = express();

app.use(express.static('public'));

var env = nunjucks.configure('views', { noCache: true });
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// app.get('/', function(req, res, next){
//   res.render('index')
//   .catch(next)
// })

// app.get('/zip', function(req, res, next) {
//   res.send(req.params.zip);
// })


app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send(err.message);
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
})
