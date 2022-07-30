(function () {
    'use strict';

    angular
        .module('MyApp')
        .controller('addEditProductController', addEditProductController);

    addEditProductController.$inject = ['$http', '$scope','$routeParams'];

    function addEditProductController($http, $scope, $routeParams) {
        var productId = $routeParams.id;
        
            $http({
                method: 'GET',
                url: 'api/Product/details/' + productId
            }).then(function successCallback(response) {
                console.log(response);
                $scope.productDetail = response.data;
                //$scope.products = response.data;
            }, function errorCallback(response) {
                console.log(response);
            });

        $scope.updateProduct = function (product) {
            var isConfirm = confirm('Update it?');
            if (isConfirm) {
                $http({
                    method: 'POST',
                    url: 'api/Product/update',
                    data: product,
                    headers: { 'Content-Type': 'application/json' },
                }).then(function successCallback(response) {
                    // confirm('update');
                    window.location.href = '/';
                    console.log(response);
                }, function errorCallback(response) {
                    console.log(response);
                });
            }
        }

    }
})();
