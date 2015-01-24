angular.module('angularDeckster.directives')
.directive('decksterCard', function() {
  return {
    restrict: 'EA',
    replace: true,
    require: ['^decksterDeck', '^gridster', 'decksterCard'],
    controller: 'decksterCardCtrl',
    templateUrl: '/deckster-card/card.html',
    scope: {
      card: '=cardItem'
    },
    link: function(scope, element, attrs, ctrls) {
      var decksterDeckCtrl =  ctrls[0];
      var decksterCardCtrl = ctrls[2];

      scope.gridsterConfig = ctrls[1];

      decksterCardCtrl.setCard(element);
    }
  };
});