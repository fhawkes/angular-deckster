angular.module('angularDeckster.services')
.factory('decksterService', ['decksterConfig', '$rootScope', function(decksterConfig, $rootScope) {
  return {

    /**
     * Function used to initialized array of cards for a deck
     * @param deckId
     * @param cards $scope variable that is an array of cards to be filled
     */
    buildCards: function(deckId, cards) {
      angular.forEach(decksterConfig.decks[deckId].cards, function(card) {
        card.deckId = deckId;

        // Get card defaults and merge with deck card configs
        cards.push(angular.extend({}, decksterConfig.cardDefaults[card.id], card));
      });
    },

    /**
     * Broadcasts reload event for deck specified by deckId
     * @param deckId
     */
    reloadDeck: function(deckId) {
      $rootScope.$broadcast('deckster.deck.reload.' + deckId);
    }
  };
}]);