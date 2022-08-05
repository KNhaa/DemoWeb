angular.module('MyApp', ['ngRoute', 'angularUtils.directives.dirPagination'])
    .config(['$routeProvider',
        function config($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'pages/IndexContent.html',
                    controller: 'productController'
                })
                .when('/add', {
                    templateUrl: 'pages/AddProduct.html',
                    controller: 'productController'
                })
                .when('/edit/:id', {
                    templateUrl: 'pages/AddProduct.html',
                    controller: 'addEditProductController'
                })
                .otherwise({ redirectTo: '/' });
        }]);

