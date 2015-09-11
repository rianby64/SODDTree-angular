//;(function() {
//  "use strict";
//  angular.module('soddTree', []);
//})();

//;(function() {
//  "use strict";
//  
//  angular
//    .module('soddTree')
//    .controller('soddTreeController', ['$scope', soddTreeController]);
//  
//  function soddTreeController($scope) {
//    $scope.tree = $scope.tree || [];
//    
//    $scope.onClickPlus = function(node) {
//      console.log(node, 'on plus');
//    };
//    
//    $scope.onClickNode = function(node) {
//      console.log(node, 'on node clicked');
//    };
//    
//  }
//  
//})();

//
//;(function() {
//  "use strict";
//  
//  angular
//    .module('soddTree')
//    .directive('soddtree', soddTreeDirective);
//
//  function soddTreeDirective() {
//    return {
//      restrict: 'E',
//      scope: {
//        tree: '='
//      },
//      controller: 'soddTreeController',
//      templateUrl: 'html/soddTreeTmpl.html'
//    };
//  }
//  
//})();