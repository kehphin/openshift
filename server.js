var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var alice = {firstName: "Alice", lastName: "Wonderland"};
var bob = {firstName: "Bob", lastName: "Marley"};
var charlie = {firstName: "Charlie", lastName: "Garcia"};

var developers = [alice, bob, charlie];


app.get('/alice', function(req, res) {

  res.send(alice);
});

// read one
app.get('/developer/:index', function(req, res){ // express parses url, extracts index and associates it with a value
  var index = req.params['index'];

  res.json(developers[index]); //respond with text
});

// read all
app.get('/developer', function(req, res){
  res.send(developers); //respond with text
});



app.get('/hello', function(req, res){ // listen for url that has pattern '/hello',  then calls the callback
  res.send('hello world'); //respond with text
});

app.get('/goodbye', function(req, res){ // listen for url that has pattern '/goodbye'
  res.send('goodbye world'); //respond with text
});

app.listen(port, ip);