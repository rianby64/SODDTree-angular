;(function() {
  "use strict";
  angular
    .module('SODDTree')
    .directive('soddtreeDrag', soddtreeDrag);
  
  function soddtreeDragLink(scope, element, attrs) {
    
    function dragstart(event) {
      return scope.onDragstart(event, scope, element, attrs);
    }
    function dragend(event) {
      return scope.onDragend(event, scope, element, attrs);
    }
    
    [].forEach.call(element, function(item) {
      item.addEventListener('dragstart', dragstart);
      item.addEventListener('dragend', dragend);
    });
  }
  
  function soddtreeDrag() {
    return {
      restrict: 'A',
      scope: {
        leaf: '=',
        dragstart: '=',
        dragend: '='
      },
      link: soddtreeDragLink,
      controller: 'soddtreeDragController'
    };
  }
})();
