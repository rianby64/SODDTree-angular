;(function() {
  "use strict";
  angular
    .module('SODDTree')
    .directive('soddtreeDrag', soddtreeDrag);
  
  function soddtreeDragLink(scope, element, attrs) {
    
    function dragstart(event) {
      event.dataTransfer.setData('SODDLeaf', scope.leaf.id());
      event.dataTransfer.effectAllowed = "all";
      event.stopPropagation();
    }
    
    [].forEach.call(element, function(item) {
      item.addEventListener('dragstart', dragstart);
    });
  }
  
  function soddtreeDrag() {
    return {
      restrict: 'A',
      scope: {
        leaf: '='
      },
      link: soddtreeDragLink,
      controller: 'soddtreeDragController'
    };
  }
})();
