;(function() {
  "use strict";
  angular
    .module('SODDTree')
    .service('DDService', DDService);
  
  function DDService() {
    
    this.dragenter = function DDService_dragenter(event, scope) {
      event.target.style.opacity = 0.5;
      event.preventDefault();
    };
    this.dragleave = function DDService_dragleave(event, scope) {
      event.target.style.opacity = 1.0;
      event.preventDefault();
    };
    this.dragover = function DDService_dragover(event, scope) {
      event.preventDefault();
    };
    this.dragstart = function DDService_dragstart(event, scope) {
      event.dataTransfer.setData('SODDLeaf', scope.leaf.id());
      event.dataTransfer.effectAllowed = "all";
      
      event.target.style.opacity = 0.5;
    };
    this.dragend = function DDService_dragend(event, scope) {
      event.target.style.opacity = 1.0;
    };
    this.drop = function DDService_drop(event, scope) {
      var root = scope.leaf.node().$scope.root, // very strange way to get the root
          dragId = event.dataTransfer.getData('SODDLeaf'),
          drag = root.findLeaf(dragId, 'id'), // what about if perfom search inside parent?
          drop = scope.leaf,
          parentDrag = drag.node().$scope.parent,
          parentDrop = drop.node().$scope.parent;
      
      drag.dropIntoLeaf(drop);
      parentDrop.node().$scope.refresh();
      parentDrag.node().$scope.refresh();
      event.target.style.opacity = 1.0;
    };
    
  }
})();