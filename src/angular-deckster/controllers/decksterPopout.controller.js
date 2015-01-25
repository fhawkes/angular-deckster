angular.module('angularDeckster.controllers')
.controller('decksterPopoutCtrl', ['decksterConfig', function(decksterConfig) {
  this.getTemplateUrl = function(cardId) {
    return decksterConfig.cardDefaults[cardId].detailTemplateUrl;
  };
}]);