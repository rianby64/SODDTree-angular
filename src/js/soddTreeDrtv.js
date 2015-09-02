
;(function() {
  "use strict";
  
  angular
    .module('soddTree')
    .directive('soddtree', soddTreeDirective);

  function soddTreeDirective() {
    return {
      restrict: 'E',
      scope: {
        tree: '='
      },
      controller: 'soddTreeController',
      templateUrl: 'html/soddTreeTmpl.html'
    };
  }
  
})();