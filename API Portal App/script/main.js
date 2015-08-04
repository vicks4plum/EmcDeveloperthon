var app = angular.module('apiportalApp',['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html"})
    // Pages
    .when("/registration", {templateUrl: "partials/registration.html", controller: "RegistrationController"})
    .when("/apis", {templateUrl: "partials/apis.html"})
    .when("/pricing", {templateUrl: "partials/pricing.html"})
    .when("/services", {templateUrl: "partials/services.html"})
    .when("/contact", {templateUrl: "partials/contact.html"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html"});
}]);

app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);



// create angular controller and pass in $scope and $http
app.controller('RegistrationController', ['$scope','$http','$filter', function($scope, $http, $filter) {
  $scope.formData = {};
  var date = new Date();
  $scope.currentDate = $filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ss');
  $scope.ApiprocessForm = function() {
            $http({
              method  : 'POST',
              url     : 'http://10.30.117.148/ChargebackPublish/api/apimasters',
              data    : {'Name': $scope.formData.ApiName, 'Owner': $scope.formData.ApiOwner,'PublishedDate': $scope.currentDate , 'IsActive': "true", 'ApiUrl': $scope.formData.ApiUrl },
              headers : { 'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
             })
              .success(function(data) {
                console.log(data);
          });
        };
    $scope.AppprocessForm = function() {
            $http({
              method  : 'POST',
              url     : 'http://10.30.117.148/ChargebackPublish/api/appmasters',
              data    : {'Name': $scope.formData.AppName, 'Owner': $scope.formData.AppOwner,'CreatedDate': $scope.currentDate , 'IsActive': "true", 'CreatedBy': "System" },
              headers : { 'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
             })
              .success(function(data) {
                console.log(data);
          });
        };

}]);

app.controller('ApiListController', function ($scope, $http) {
    $http.get('http://10.30.117.148/ChargebackPublish/api/apimasters').success(function(data) {
        $scope.Apis = data;
            console.log(data);
    }); 
});