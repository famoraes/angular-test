app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  // no route goes to index
  $urlRouterProvider.when('/', '/invoices');

  $stateProvider
    .state('invoices', {
      url: '/invoices',
      abstract: true,
      views: {
        content: {
          templateUrl: 'src/components/invoice/views/base.html',
          controller: 'InvoiceController',
          controllerAs: 'ctrl'
        }
      }
    })
    .state('invoices.list', {
      url: '',
      templateUrl: 'src/components/invoice/views/list.html',
    })
    .state('invoices.create', {
      url: '/new',
      templateUrl: 'src/components/invoice/views/change.html',
    })
    .state('invoices.edit', {
      url: '/edit/{id}',
      templateUrl: 'src/components/invoice/views/change.html',
    })
    .state('companies', {
      url: '/companies',
      abstract: true,
      views: {
        content: {
          templateUrl: 'src/components/company/views/base.html',
          controller: 'CompanyController',
          controllerAs: 'ctrl'
        }
      }
    })
    .state('companies.list', {
      url: '',
      templateUrl: 'src/components/company/views/list.html',
    })
    .state('companies.create', {
      url: '/new',
      templateUrl: 'src/components/company/views/change.html',
    })
    .state('companies.edit', {
      url: '/edit/{id}',
      templateUrl: 'src/components/company/views/change.html',
    })
    .state('products', {
      url: '/products',
      abstract: true,
      views: {
        content: {
          templateUrl: 'src/components/product/views/base.html',
          controller: 'ProductController',
          controllerAs: 'ctrl'
        }
      }
    })
    .state('products.list', {
      url: '',
      templateUrl: 'src/components/product/views/list.html',
    })
    .state('products.create', {
      url: '/new',
      templateUrl: 'src/components/product/views/change.html',
    })
    .state('products.edit', {
      url: '/edit/{id}',
      templateUrl: 'src/components/product/views/change.html',
    });

}]);
