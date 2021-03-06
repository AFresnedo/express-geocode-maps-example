var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
// var db = require('./models');
var rowdy = require('rowdy-logger');
var app = express();
var geocoder = require('geocoder');

rowdy.begin(app);

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

var places = [{name: 'General Assembly', address:
  '1218 3rd Ave, Seattle WA 98101'}];

app.get('/', function(req, res) {
    // db.place.findAll().then(function(places) {
        // res.render('index', { places: places });
    // }).catch(function(err) {
        // res.send({ message: 'error', error: err });
    // });
  res.render('index', { places: places });
});

app.post('/places', function(req, res) {
    // db.place.create({
        // name: req.body.name,
        // address: req.body.address
    // }).then(function(place) {
        // res.redirect('/');
    // }).catch(function(err) {
        // res.send({ message: 'error', error: err });
    // });
  console.log(req.body);
  places.push({
    name: req.body.name,
    address: req.body.address
  });
  // TODO taylor doesn't have this, but i added it to fix hang bug
  res.redirect('/');
});

var server = app.listen(process.env.PORT || 3000, function() {
    rowdy.print();
});

module.exports = server;
