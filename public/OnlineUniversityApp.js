var app = angular.module("OnlineUniversityApp", [])

app.controller("OnlineUniversityController", function ($scope, $http) {
  $scope.hello = "Hello from Angular";
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