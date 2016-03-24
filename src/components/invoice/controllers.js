app.controller('InvoiceController', ['$scope', '$rootScope', '$state', 'appConfig', 'appInvoice', 'appCompany', function($scope, $rootScope, $state, appConfig, appInvoice, appCompany) {

  $scope.appConfig = appConfig;
  $scope.params = {}
  $scope.invoices = appInvoice($scope.params);
  $scope.companies = appCompany({});

  $scope.$watch('params', function(newVal, oldVal) {
    $scope.invoices.getList();
  }, true);

  $scope.$watch('state.params', function(params) {
    if (!params.id) return;
    $scope.invoices.get(params.id);
  });

  $scope.companies.getList();

  $scope.createInvoicy = function() {
    return $scope.students.create().then(function(response) {

    }, function(response) {

    });
  }

}]);
