(function () {
    'use strict';
    angular
        .module('MyApp')
        .controller('productController', productController);

    productController.$inject = ['$http', '$scope'];

    function productController($http, $scope) {
        $scope.isEditForm = false;
        $scope.loadProductList = function () {
            $http({
                method: 'GET',
                url: 'api/Product/'
            }).then(function successCallback(response) {
                console.log(response);
                $scope.products = response.data;
            }, function errorCallback(response) {
                console.log(response);
            });
        }
        $scope.loadProductList();

        $scope.deleteProduct = function (id) {
            var isConfirm = confirm('Delete it?');
            if (isConfirm) {
                $http({
                    method: 'POST',
                    url: 'api/Product/delete/' + id
                }).then(function successCallback(response) {
                    console.log(response);
                    $scope.loadProductList();
                }, function errorCallback(response) {
                    console.log(response);
                });
            }
        }

        $scope.searchText = "";
        $scope.searchFilter = function (item) {
            // Add your own search logic here
            return item.name.toLowerCase().includes($scope.searchText.toLowerCase())
                || item.description.toLowerCase().includes($scope.searchText.toLowerCase());
        }

        $scope.addProduct = function (product) {
            product.uploadFile = $scope.myFile;
            var formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('description', product.description);
            formData.append('uploadFile', product.uploadFile);
            $http({
                method: 'POST',
                url: 'api/Product/add',
                data: formData,
                enctype: 'multipart/form-data',
                headers: {
                    'Content-Type': undefined
                }
            }).then(function successCallback(response) {
                console.log(response);
                document.getElementById('image').setAttribute('src', null);
                document.getElementById('myForm').reset();
            }, function errorCallback(response) {
                console.log(response);
            });
        }
    }
})();
