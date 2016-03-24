app.factory('appInvoice', ['$rootScope', '$http', 'appConfig', function($rootScope, $http, appConfig) {

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
        mock_inventory_invoice: data
      }
    }

    var _getList = function() {
      return $http({
        url: appConfig.baseApi + '/invoices.json',
        method: 'GET',
        params: _params
      }).then(function(response){
        _data.list = response.data.results.map(function(item) { return item; });

        return response;
      });
    }

    var _get = function(id) {
      return $http.get(appConfig.baseApi + '/invoices/' + id + '.json?api_token=' + _params.api_token).then(function(response) {
        _data.edit = _deserialize(response.data);

        return response;
      });
    }

    var _create = function(invoiceData) {
      var data = angular.copy(invoiceData) || angular.copy(_data.edit);

      if (data.id) return _update(data);

      return $http.post(appConfig.baseApi + '/invoices.json', data).then(function(response) {
        _getList();
        _data.edit = {};

        return response;
      });
    }

    var _update = function(invoiceData) {
      var data = invoiceData || angular.copy(_data.edit);

      return $http.put(appConfig.baseApi + '/invoices/' + data.id + '.json', data).then(function(response) {
        _getList();
        _data.edit = {};

        return response;
      });
    }

    var _remove = function(data) {
      var data = data || angular.copy(_data.edit);

      return $http.delete(appConfig.baseApi + '/invoices/' + data.id + '.json').then(function(response) {
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
