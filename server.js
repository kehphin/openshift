var express = require('express');
var mongoose = require('mongoose');

var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/test';

var app = express();
app.use(express.static(__dirname + '/public'));

mongoose.connect(connectionString);

var CourseSchema = new mongoose.Schema({
    name: String,
    category: String,
    dateCreated: {type: Date, default: Date.now},
    description: String
}, {collection: "course"});

var CourseModel = mongoose.model('Course', CourseSchema);

/*
var course1 = new CourseModel({name: "Course 1", category: "DB", description: "weeeee"});
var course2 = new CourseModel({name: "Course 2", category: "PROG", description: "yolo"});
course1.save();
course2.save(); */



var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


// API

// create a course
app.post('/api/course', function(req, res) {
  CourseModel.find(function(err, courses) {
    res.json(courses);
  });
});

// get course by id
app.get('/api/course/:id', function(req, res) {
  CourseModel.findById(req.params.id, function(err, course) {
    res.json(course);
  });
});

// get all courses
app.get('/api/course', function(req, res) {
  CourseModel.find(function(err, courses) {
    res.json(courses);
  });
});


app.listen(port, ip);