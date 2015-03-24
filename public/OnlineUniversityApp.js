var app = angular.module("OnlineUniversityApp", [])

app.controller("OnlineUniversityController", function ($scope, $http) {
  $http.get("/api/course").success(function(response) {
    $scope.courses = response;
  });

  $scope.add = function() {
    $scope.editedCourse = null;
    $('.course-modal').modal('show');
  }

  $scope.edit = function(model) {
    $scope.editedCourse = model;
    $scope.editedCourse.dateCreated = new Date($scope.editedCourse.dateCreated);
    $('.course-modal').modal('show');
  }

  $scope.save = function(model) {
    if (model._id) {
      $http.put("/api/course/" + model._id, model)
      .success(function(response) {
        $scope.courses = response;
      });
    } else {
      $http.post("/api/course/", model)
      .success(function(response) {
        $scope.courses = response;
      });
    }

    $('.course-modal').modal('hide');
  }

  $scope.remove = function(model) {
    $http.delete("/api/course/" + model._id)
    .success(function(response) {
      $scope.courses = response;
      $('.delete-course-modal').modal('show');
    });
  }
});