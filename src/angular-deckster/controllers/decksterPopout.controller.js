angular.module('angularDeckster.controllers')
.controller('decksterPopoutCtrl', ['decksterConfig', function(decksterConfig) {
  this.getSummaryTemplateUrl = function(cardId) {
    return decksterConfig.cardDefaults[cardId].summaryTemplateUrl;
  };

  this.getDetailTemplateUrl = function(cardId) {
    return decksterConfig.cardDefaults[cardId].detailTemplateUrl;
  };
}]);