var app = angular.module('akdmie', ['ui.router']);

app.constant('appConfig', {
    baseApi: 'https://upwork.interviewed.com/mock/inventory'
});

// start up
app.run(['$rootScope', '$state', '$http', function($rootScope, $state, $http){

    $rootScope.state = $state;
    $rootScope.APIToken = '2321e1d4257d0d76c4a8fb8315ea8a89';

    // $http.defaults.headers.common['Content-Type'] = 'application/json';

}]);
