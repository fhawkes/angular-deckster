angular.module('angularDeckster.directives')
.directive('decksterCard', function() {
  return {
    restrict: 'EA',
    replace: true,
    require: ['^gridster', 'decksterCard'],
    controller: 'decksterCardCtrl',
    templateUrl: '/deckster-card/card.html',
    scope: {
      card: '=cardItem'
    },
    link: function(scope, element, attrs, ctrls) {
      var decksterCardCtrl = ctrls[1];

      scope.gridsterConfig = ctrls[0];

      decksterCardCtrl.setCard(element);

      // Listen for deck refresh
      scope.$on('deckster.deck.reload.' + scope.card.deckId, function() {
        decksterCardCtrl.reloadCard();
      });
    }
  };
});