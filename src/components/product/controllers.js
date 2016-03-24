app.controller('ProductController', ['$scope', '$rootScope', '$state', 'appConfig', 'appProduct', function($scope, $rootScope, $state, appConfig, appProduct) {

  $scope.appConfig = appConfig;
  $scope.params = {}
  $scope.products = appProduct($scope.params);

  $scope.$watch('params', function(newVal, oldVal) {
    $scope.products.getList();
  }, true);

  $scope.$watch('state.params', function(params) {
    if (!params.id) return;
    $scope.products.get(params.id);
  });

  $scope.createProduct = function() {
    return $scope.products.create().then(function(response) {
      $state.go('products.list');
    }, function(response) {

    });
  }

}]);
