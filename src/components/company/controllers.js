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

  // $scope.removeStudent = function() {
  //   var confirmModal = $("#confirmModal");

  //   return $scope.students.remove().then(function(response) {
  //     Notifications.success('Aluno removido com sucesso.').show();
  //   }, function(response) {
  //     Notifications.error(response.data['detail']).show();
  //   });
  // }

  $scope.createCompany = function() {
    return $scope.companies.create().then(function(response) {
      $state.go('companies.list');
    }, function(response) {

    });
  }

}]);
