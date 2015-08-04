var app = angular.module('apiportalApp',['ngRoute','ui']);

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

app.controller('PricingModelController', ['$scope','$http','$filter', function($scope, $http, $filter) {
  $scope.formData = {};
  $scope.getApiById = function(ApiIDSelected) {
    $scope.ApiIDSelected = ApiIDSelected
        console.log("API ID Selected");
        $http.get('http://10.30.117.148/ChargebackPublish/api/apimasters/'+ ApiIDSelected).success(function(data){
            $scope.api = data;
                console.log("ApiID Selected" + data);
        });
    };
    $scope.MonetizeprocessForm = function(ApiIDSelected) {
       $http({
          method  : 'PUT',
          url     : 'http://10.30.117.148/ChargebackPublish/api/apimasters/'+ $scope.ApiIDSelected,
          data    : {'ApiID': $scope.api.ApiID, 'Name': $scope.api.Name,'Owner': $scope.api.Owner, 'PublishedDate': $scope.api.PublishedDate,'IsActive': $scope.api.IsActive,'ApiUrl': $scope.api.ApiUrl,'ApiKey': $scope.api.ApiKey,'DevelopmentCost': $scope.api.DevelopmentCost,'OperationalCost':  $scope.api.OperationalCost,'IsMonetized': false },
          headers : { 'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
         })
          .success(function(data) {
            console.log("Monetized API:" + data);
        });
    };
}]);

app.controller('ApiListController', function ($scope, $http) {
    $http.get('http://10.30.117.148/ChargebackPublish/api/apimasters').success(function(data) {
        $scope.Apis = data;
            console.log("APi List:" + data);
    }); 
});

app.controller('AppListController', function ($scope,$http){
    $http.get('http://10.30.117.148/ChargebackPublish/api/appmasters').success(function(data) {
        $scope.Apps = data;
            console.log(data);
    }); 
});

app.controller('PricingListController', function ($scope,$http){
    $http.get('http://10.30.117.148/ChargebackPublish/api/apiplans').success(function(data) {
        $scope.plans = data;
            console.log("Pricing Models:" + data);
    });
});

