var app = angular.module("OnlineUniversityApp", [])

app.controller("OnlineUniversityController", function ($scope, $http) {
  $scope.hello = "Hello from Angular";
  $scope.courses =
    [ { title : "Java 101", category : "PROG", dateCreated : "2015-01-01", description : "Wow", id: 0 },
      { title : "MongoDB 101", category : "DB", dateCreated : "2015-02-01", description : "Good", id: 1 },
      { title : "Express 101", category : "PROG", dateCreated : "2015-03-01", description : "Better", id: 2 },
      { title : "AngularJS 101", category : "WEB", dateCreated : "2015-04-01", description : "Best", id: 3 },
      { title : "NodeJS 101", category : "PROG", dateCreated : "2015-05-01", description : "Awesome", id: 4 }
    ];

  $http.get("developer/")
  .success(function (response) {
    $scope.developers = response;
  });

  $scope.remove = function(index) {
    $http.delete("developer/" + index)
    .success(function(response) {
      $scope.developers = response;
    });
  }
});