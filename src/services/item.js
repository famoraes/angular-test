app.factory('appItem', ['$rootScope', '$http', 'appConfig', function($rootScope, $http, appConfig) {

  function factory(params) {

    var _params = angular.extend(params, {
      page: 1,
      api_token: $rootScope.APIToken
    }, angular.copy(params));

    var _data = {
      list: [],
      edit: {}
    }

    var _deserialize = function(data) {
      return {
        mock_inventory_product: data
      }
    }

    var _getList = function() {
      return $http({
        url: appConfig.baseApi + '/invoice_items.json',
        method: 'GET',
        params: _params
      }).then(function(response){
        _data.list = response.data.results.map(function(item) { return item; });

        return response;
      });
    }

    var _get = function(id) {
      console.log(arguments.callee.caller.toString());
      return $http.get(appConfig.baseApi + '/invoice_items/' + id + '.json?api_token=' + $rootScope.APIToken).then(function(response) {
        _data.edit = _deserialize(response.data);

        return response;
      });
    }

    var _create = function(companyData) {
      var data = angular.copy(companyData) || angular.copy(_data.edit);

      if (data.id) return _update(data);

      data.api_token = $rootScope.APIToken;

      return $http.post(appConfig.baseApi + '/invoice_items.json?api_token=' + $rootScope.APIToken, data).then(function(response) {
        _getList();
        _data.edit = {};

        return response;
      });
    }

    var _update = function(companyData) {
      var data = companyData || angular.copy(_data.edit);

      data.api_token = $rootScope.APIToken;

      return $http.put(appConfig.baseApi + '/invoice_items/' + data.id + '.json?api_token=' + $rootScope.APIToken, data).then(function(response) {
        _getList();
        _data.edit = {};

        return response;
      });
    }

    var _remove = function(data) {
      var data = data || angular.copy(_data.edit);

      return $http.delete(appConfig.baseApi + '/invoice_items/' + data.id + '.json').then(function(response) {
        _getList();
        _data.edit = {};

        return response;
      });
    }

    var factory = {
      getList: _getList,
      get: _get,
      create: _create,
      update: _update,
      data: _data,
      remove: _remove
    }

    return factory;
  }

  return factory;

}]);
