app.controller('CompanyController', ['$scope', '$rootScope', '$state', 'appConfig', 'appCompany', function($scope, $rootScope, $state, appConfig, appCompany) {

  $scope.appConfig = appConfig;
  $scope.params = {}
  $scope.companies = appCompany($scope.params);

  $scope.$watch('params', function(newVal, oldVal) {
    $scope.companies.getList();
  }, true);

  $scope.$watch('state.params', function(params) {
    if (!params.id) return;
    $scope.companies.get(params.id);
  });

  $scope.createCompany = function() {
    return $scope.companies.create().then(function(response) {
      $state.go('companies.list');
    }, function(response) {

    });
  }

}]);
