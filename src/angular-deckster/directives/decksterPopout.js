angular.module('angularDeckster.directives')
.directive('decksterPopout', ['$injector', '$compile', 'Card', function($injector, $compile, Card) {
  return {
    replace: true,
    controller: 'decksterPopoutCtrl',
    template: '<div class="deckster-popout-content"></div>',
    link: function(scope, element, attrs, decksterPopoutCtrl) {
      var cardId;

      if($injector.has('$stateParams')) {
        var $stateParams = $injector.get('$stateParams');
        cardId = $stateParams.cardId;

      } else if($injector.has('$routeParams')) {
        var $routeParams = $injector.get('$routeParams');
        cardId = $routeParams.cardId;
      }
      

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