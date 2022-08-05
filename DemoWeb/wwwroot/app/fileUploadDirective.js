(function () {
    'use strict';

    angular
        .module('MyApp')
        .directive('fileUploadDirective', fileUploadDirective);

    fileUploadDirective.$inject = ['$window', '$parse'];

    function fileUploadDirective($window, $parse) {
        return {
            restrict: 'A', //the directive can be used as an attribute only
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileUploadDirective),
                    modelSetter = model.assign; //define a setter for demoFileModel
                //Bind change event on the element
                element.bind('change', function () {
                    //Call apply on scope, it checks for value changes and reflect them on UI
                    scope.$apply(function () {
                        //set the model value
                        modelSetter(scope, element[0].files[0]);
                        console.log(element[0].files[0]);
                    });
                    var fileReader = new FileReader();
                    fileReader.onload = function (even) {
                        let dataURL = even.target.result;
                        document.getElementById('image').setAttribute('src', `${dataURL}`);
                    }
                    fileReader.readAsDataURL(element[0].files[0]);
                });
            }
        }
    }
})();
/*
 link is a function that defines functionality of directive
 scope: scope associated with the element
 element: element on which this directive used
 attrs: key value pair of element attributes
 */