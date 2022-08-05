(function () {
    'use strict';

    angular
        .module('MyApp')
        .controller('addEditProductController', addEditProductController);

    addEditProductController.$inject = ['$http', '$scope', '$routeParams'];

    function addEditProductController($http, $scope, $routeParams) {
        var productId = $routeParams.id;
        $scope.isEditForm = true;
        $http({
            method: 'GET',
            url: 'api/Product/details/' + productId
        }).then(function successCallback(response) {
            $scope.productDetail = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });

        $scope.updateProduct = function (product) {
            var isConfirm = confirm('Update it?');
            if (isConfirm) {
                product.uploadFile = $scope.myFile;
                var formData = new FormData();
                formData.append('id', product.id);
                formData.append('name', product.name);
                formData.append('price', product.price);
                formData.append('description', product.description);
                formData.append('uploadFile', product.uploadFile);

                $http({
                    method: 'POST',
                    url: 'api/Product/update',
                    data: formData,
                    enctype: 'multipart/form-data',
                    headers: {
                        'Content-Type': undefined
                    }
                }).then(function successCallback(response) {
                    window.location.href = '/';
                    console.log(response);
                }, function errorCallback(response) {
                    console.log(response);
                });
            }
        }
    }
})();
