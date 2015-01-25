angular.module('angularDeckster.directives')
.directive('decksterPopout', ['$routeParams', '$compile', 'Card', function($routeParams, $compile, Card) {
  return {
    replace: true,
    controller: 'decksterPopoutCtrl',
    template: '<div class="deckster-popout-content"></div>',
    link: function(scope, element, attrs, decksterPopoutCtrl) {
      var cardId = $routeParams.cardId;

      if(cardId) {
        var templateUrl = decksterPopoutCtrl.getTemplateUrl(cardId);
        var card = new Card({popoutTemplateUrl: templateUrl});

        card.getPopoutContent(function(template) {
          element.html(template);
          $compile(element.contents())(scope);
        });
      }
    }
  };
}]);