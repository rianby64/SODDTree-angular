
;(function() {
  "use strict";
  angular
    .module('SODDTree')
    .controller('soddtreeLeafController', ['$scope', soddtreeLeafController]);
  
  function soddtreeLeafController($scope) {
    var leaf = $scope.leaf;
    $scope.label = leaf.getLabel() || "";
    $scope.leaf.update = function() {
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
    
    
    $scope.dragenter = function(event, scope) {
      event.target.style.opacity = 0.5;
      event.preventDefault();
    };
    $scope.dragleave = function(event, scope) {
      event.target.style.opacity = 1.0;
      event.preventDefault();
    };
    $scope.dragover = function(event, scope) {
      event.preventDefault();
    };
    $scope.dragstart = function(event, scope) {
      event.dataTransfer.setData('SODDLeaf', scope.leaf.id());
      event.dataTransfer.effectAllowed = "all";
      
      event.target.style.opacity = 0.5;
    };
    $scope.dragend = function(event, scope) {
      event.target.style.opacity = 1.0;
    };
    $scope.drop = function(event, scope) {
      var root = $scope.root,
          dragId = event.dataTransfer.getData('SODDLeaf'),
          drag = root.findLeaf(dragId, 'id'),
          drop = scope.leaf;
      
      console.log('from', drag.getLabel());
      console.log('to', drop.getLabel());
      
      drag.dropIntoLeaf(drop);
      
      drop.update();
      drag.update();
      event.target.style.opacity = 1.0;
    };
  }
})();
