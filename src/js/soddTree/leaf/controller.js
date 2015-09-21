
;(function() {
  "use strict";
  angular
    .module('SODDTree')
    .controller('soddtreeLeafController', ['$scope', 'DDService', soddtreeLeafController]);
  
  function soddtreeLeafController($scope, DDService) {
    var leaf = $scope.leaf;
    $scope.label = leaf.getLabel() || "";
    $scope.leaf.node().$scope = $scope; // so, this sounds very strange... reconsider this line
    
    $scope.refresh = function refresh() {
      $scope.$parent.$digest();
    };
    
    $scope.setLabel = function setLabel(label) {
      leaf.setLabel(label);
      $scope.label = label;
    };
    
    $scope.getLabel = function getLabel() {
      var label = $scope.label || leaf.getLabel();
      return $scope.label;
    };
    
    $scope.dragenter = DDService.dragenter;
    $scope.dragleave = DDService.dragleave;
    $scope.dragover = DDService.dragover;
    $scope.dragstart = DDService.dragstart;
    $scope.dragend = DDService.dragend;
    $scope.drop = DDService.drop;
  }
})();
