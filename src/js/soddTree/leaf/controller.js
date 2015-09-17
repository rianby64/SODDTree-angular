
;(function() {
  "use strict";
  angular
    .module('SODDTree')
    .controller('soddtreeLeafController', ['$scope', soddtreeLeafController]);
  
  function soddtreeLeafController($scope) {
    var leaf = $scope.leaf;
    $scope.label = leaf.getLabel() || "";
    
    $scope.setLabel = function setLabel(label) {
      leaf.setLabel(label);
      $scope.label = label;
    };
    
    $scope.getLabel = function getLabel() {
      var label = $scope.label || leaf.getLabel();
      return $scope.label;
    };
    
    
    $scope.dragenter = function(event) {
      event.target.style.opacity = 0.5;
    };
    $scope.dragleave = function(event) {
      event.target.style.opacity = 1.0;
    };
    $scope.dragstart = function(event, scope) {
      event.dataTransfer.setData('SODDLeaf', scope.leaf.id());
      event.dataTransfer.effectAllowed = "all";
      
      event.target.style.opacity = 0.5;
    };
    $scope.drop = function(event, scope) {
      console.log('from', event.dataTransfer.getData('SODDLeaf'));
      console.log('to', scope.leaf.id());
      
      event.target.style.opacity = 1.0;
    };
  }
})();
