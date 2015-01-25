angular.module('angularDeckster.controllers')
.controller('decksterDeckCtrl', ['$scope', 'Card', function($scope, Card) {
  $scope.cardList = [];

  // Mapping for deckster card configuration to gridsterItem configuration
  $scope.cardConfigMap = {
    sizeX: 'card.size.x',
    sizeY: 'card.size.y',
    row: 'card.position[0]',
    col: 'card.position[1]',
    minSizeY: 'card.minSizeY',
    maxSizeY: 'card.maxSizeY'
  };

  this.initCards = function(cards) {
    $scope.cardList = (cards || []).map(function(card) {
      return new Card(card);
    });
  };
}]);