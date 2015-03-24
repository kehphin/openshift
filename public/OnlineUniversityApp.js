var app = angular.module("OnlineUniversityApp", [])

app.controller("OnlineUniversityController", function ($scope, $http) {
  $scope.courses =
    [ { name : "Java 101", category : "PROG", dateCreated: new Date(2013, 9, 22), description : "Wow"},
      { name : "MongoDB 101", category : "DB", dateCreated : new Date(2013, 1, 1), description : "Good"},
      { name : "Express 101", category : "PROG", dateCreated : new Date(2013, 2, 1), description : "Better"},
      { name : "AngularJS 101", category : "WEB", dateCreated : new Date(2013, 3, 1), description : "Best"},
      { name : "NodeJS 101", category : "PROG", dateCreated : new Date(2013, 4, 1), description : "Awesome"}
    ];

  $scope.add = function() {
    $('.course-modal').modal('show');
  }

  $scope.edit = function(model) {
    $scope.editedCourse = model;
    $('.course-modal').modal('show');
  }

  $scope.save = function(model) {


    /*
    $scope.editedCourse = model;
    $('.course-modal').modal('show');


    $http.delete("api/" + index)
    .success(function(response) {
      $scope.developers = response;
    });*/
  }

  $scope.remove = function(index) {
    $http.delete("api/" + index)
    .success(function(response) {
      $scope.developers = response;
    });
  }
});