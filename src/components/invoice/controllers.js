app.controller('InvoiceController', ['$scope', '$rootScope', '$state', 'appConfig', 'appInvoice', function($scope, $rootScope, $state, appConfig, appInvoice) {

  $scope.appConfig = appConfig;
  $scope.params = {}
  $scope.invoices = appInvoice($scope.params);

  $scope.$watch('params', function(newVal, oldVal) {
    $scope.invoices.getList();
  }, true);

  $scope.$watch('state.params', function(params) {
    if (!params.id) return;
    $scope.invoices.get(params.id);
  });

  // $scope.removeStudent = function() {
  //   var confirmModal = $("#confirmModal");

  //   return $scope.students.remove().then(function(response) {
  //     Notifications.success('Aluno removido com sucesso.').show();
  //   }, function(response) {
  //     Notifications.error(response.data['detail']).show();
  //   });
  // }

  // $scope.createStudent = function(form) {
  //   return $scope.students.create().then(function(response) {
  //     Notifications.success('Aluno salvo com sucesso').show();
  //     $state.go('students.list');
  //   }, function(response) {
  //     form.setApiErrors(response.data);
  //   });
  // }

}]);
