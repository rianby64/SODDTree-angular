;(function() {
  "use strict";
  angular
    .module('SODDTree')
    .directive('soddtreeLeaf', soddtreeLeafDirective);
  
  function soddtreeLeafDirective() {
    return {
      restrict: 'E',
      scope: {
        leaf: '=',
        parent: '=',
        root: '='
      },
      controller: 'soddtreeLeafController',
      templateUrl: 'html/SODDTreeLeafTmpl.html'
    };
  }
})();