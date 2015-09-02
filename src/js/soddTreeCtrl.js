;(function() {
  "use strict";
  
  angular
    .module('soddTree')
    .controller('soddTreeController', ['$scope', soddTreeController]);
  
  function soddTreeController($scope) {
    $scope.tree = $scope.tree || [];
    
    $scope.onClickPlus = function(node) {
      console.log(node, 'on plus');
    };
    
    $scope.onClickNode = function(node) {
      console.log(node, 'on node clicked');
    };
    
  }
  
})();