
;(function() {
  "use strict";
  angular
    .module('SODDTree')
    .directive('soddtreeDrop', soddtreeDrop);
  
  function soddtreeDropLink(scope, element, attrs) {
    
    function drop(event) {
      console.log(scope);
      console.log('from', event.dataTransfer.getData('SODDLeaf'));
      console.log('to', scope.leaf.id());
      
      event.target.style.opacity = 1;
      event.preventDefault();
      event.stopPropagation();
    }
    
    function dragover(event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    function dragleave(event) {
      event.target.style.opacity = 1.0; // uslovnoe viipolnenie
      event.stopPropagation();
      event.preventDefault();
    }
    
    function dragenter(event) {
      event.target.style.opacity = 0.5; // uslovnoe viipolnenie
      event.stopPropagation();
      event.preventDefault();
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
        leaf: '='
      },
      link: soddtreeDropLink,
      controller: 'soddtreeDropController'
    };
  }
})();
