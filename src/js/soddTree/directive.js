;(function() {
  "use strict";
  angular
    .module('SODDTree')
    .directive('soddtree', soddtreeDirective);
  
  function soddtreeDirective() {
    return {
      restrict: 'E',
      scope: {
        tree: '='
      },
      controller: 'soddtreeController',
      templateUrl: 'html/SODDTreeTmpl.html'
    };
  }
})();