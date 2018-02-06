const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const rp = require('request-promise');
const PORT = process.env.PORT || 3013;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', './views');
app.set('view engine', 'ejs');


app.get('/', (request, response, next) => {
  var options = {
    uri: 'https://api.fixer.io/latest',
    qs: {
        base: 'USD'
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then(data => response.render('index', {data}))
    // .then( data => response.json(data))
    .catch(err =>{
      console.error( err.stack );
      response.status(500).send('an error has occured, caught in the get route in line 36.');
    });
});

app.listen( PORT, () => {
  console.log(`the fixer application is listening on port ${PORT}`)
})
