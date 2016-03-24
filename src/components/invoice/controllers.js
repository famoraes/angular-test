app.controller('InvoiceController', ['$scope', '$rootScope', '$state', 'appConfig', 'appInvoice', 'appCompany', 'appProduct', 'appItem', function($scope, $rootScope, $state, appConfig, appInvoice, appCompany, appProduct, appItem) {

  $scope.appConfig = appConfig;
  $scope.params = {}
  $scope.invoices = appInvoice($scope.params);
  $scope.companies = appCompany({});
  $scope.products = appProduct({});
  $scope.items = appItem({});

  $scope.$watch('params', function(newVal, oldVal) {
    $scope.invoices.getList();
  }, true);

  $scope.$watch('state.params', function(params) {
    if (!params.id) return;
    $scope.invoices.get(params.id);
  });

  $scope.companies.getList();
  $scope.products.getList();

  $scope.createInvoicy = function() {
    return $scope.invoices.create().then(function(response) {
      $scope.invoices.get(response.data.id);
    }, function(response) {

    });
  }

  $scope.addNewItem = function() {
    if (!$scope.invoices.data.edit.mock_inventory_invoice.mock_inventory_invoice_items) {
      $scope.invoices.data.edit.mock_inventory_invoice.mock_inventory_invoice_items = [];
    }

    $scope.invoices.data.edit.mock_inventory_invoice.mock_inventory_invoice_items.push({});
  }

  $scope.createItem = function(index) {
    var item =  $scope.invoices.data.edit.mock_inventory_invoice.mock_inventory_invoice_items[index];
    item.mock_inventory_invoice_id = $scope.invoices.data.edit.mock_inventory_invoice.id;
    console.log(item)
    $scope.items.data.edit = item;
    $scope.items.create()
  }

  $scope.createProduct = function() {
    return $scope.products.create().then(function(response) {
      $("#newProductModal").modal('hide');
      $scope.products.getList();
    }, function(response) {

    });
  }

  $scope.createCompany = function() {
    return $scope.companies.create().then(function(response) {
      $("#newCompanyModal").modal('hide');
      $scope.companies.getList();
    }, function(response) {

    });
  }

}]);
