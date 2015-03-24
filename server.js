var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');

var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/test';

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());
app.use(express.static(__dirname + '/public'));

mongoose.connect(connectionString);

var CourseSchema = new mongoose.Schema({
    name: String,
    category: String,
    dateCreated: {type: Date, default: Date.now},
    description: String
}, {collection: "course"});

var CourseModel = mongoose.model('Course', CourseSchema);

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


// API

// CREATE course
app.post('/api/course', function(req, res) {
  var course = new CourseModel(req.body);
  course.save(function(err, doc) {
    CourseModel.find(function(err, courses) {
      res.json(courses);
    });
  });
});

// UPDATE course
app.put('/api/course/:id', function(req, res) {
  CourseModel.findById(req.params.id, function(err, course) {
    course.update(req.body, function(err, count) {
      CourseModel.find(function(err, courses) {
        res.json(courses);
      })
    })
  });
});

// GET course by id
app.get('/api/course/:id', function(req, res) {
  CourseModel.findById(req.params.id, function(err, course) {
    res.json(course);
  });
});

// DELETE course by id
app.delete('/api/course/:id', function(req, res) {
  var id = req.params.id;
  CourseModel.remove({_id: id}, function(err, count) {
    CourseModel.find(function(err, courses) {
      res.json(courses);
    });
  });
});

// GET all courses
app.get('/api/course', function(req, res) {
  CourseModel.find(function(err, courses) {
    res.json(courses);
  });
});


app.listen(port, ip);