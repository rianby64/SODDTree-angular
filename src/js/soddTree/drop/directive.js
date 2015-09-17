
;(function() {
  "use strict";
  angular
    .module('SODDTree')
    .directive('soddtreeDrop', soddtreeDrop);
  
  function soddtreeDropLink(scope, element, attrs) {
    
    function drop(event) {
      scope.onDrop(event, scope, element, attrs);
    }
    
    function dragover(event) {
      scope.onDragover(event, scope, element, attrs);
    }
    
    function dragleave(event) {
      scope.onDragleave(event, scope, element, attrs);
    }
    
    function dragenter(event) {
      scope.onDragenter(event, scope, element, attrs);
    }
    
    [].forEach.call(element, function(item) {
      item.addEventListener('dragover', dragover);
      item.addEventListener('dragenter', dragenter);
      item.addEventListener('dragleave', dragleave);
      item.addEventListener('drop', drop);
    });
  }
  
  function soddtreeDrop() {
    return {
      restrict: 'A',
      scope: {
        leaf: '=',
        dragover: '=',
        dragleave: '=',
        dragenter: '=',
        drop: '='
      },
      link: soddtreeDropLink,
      controller: 'soddtreeDropController'
    };
  }
})();
