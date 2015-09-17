;(function() {
  "use strict";
  angular
    .module('SODDTree')
    .controller('soddtreeDragController', ['$scope', soddtreeDragController]);
  
  function soddtreeDragController($scope) {
    $scope.dragstart = $scope.dragstart || function errorDragstartFn() { console.error('soddtreeDragController>> dragstart fn undefined'); };
    $scope.dragend = $scope.dragend || function errorDragendFn() { };
    
    $scope.onDragstart = function onDragstart(event, scope, element, attrs) {
      return $scope.dragstart(event, scope, element, attrs);
    };    
    $scope.onDragend = function onDragstart(event, scope, element, attrs) {
      return $scope.dragend(event, scope, element, attrs);
    };
  }
})();