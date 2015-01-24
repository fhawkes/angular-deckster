angular.module('angularDeckster.directives')
.directive('decksterDeck', ['$rootScope', '$parse', function($rootScope, $parse) {
  var options = {
    gridsterOpts: {
      columns: 5,
      margins: [10, 10],
      rowHeight: 150,
      draggable: {
        handle: '.deckster-card-header'
      }
    }
  };

  return {
    replace: true,
    scope: true,
    templateUrl: '/deckster-deck/deck.html',
    controller: 'decksterDeckCtrl',
    link: function(scope, element, attrs, decksterDeckCtrl) {

      scope.deckOptions = angular.extend({}, options, $parse(attrs.deckOptions || {})(scope));

      attrs.$observe('deckCards', function(value) {
        var cards = $parse(value || [])(scope);
        decksterDeckCtrl.initCards(cards);
      });
    }
  };
}]);