angular.module('angularDeckster.directives')
.directive('decksterPopout', ['$injector', '$compile', 'Card', function($injector, $compile, Card) {
  return {
    replace: true,
    controller: 'decksterPopoutCtrl',
    template: '<div class="deckster-popout-content"></div>',
    link: function(scope, element, attrs, decksterPopoutCtrl) {
      var cardId, view;

      if($injector.has('$stateParams')) {
        var $stateParams = $injector.get('$stateParams');
        cardId = $stateParams.cardId;
        view = $stateParams.view;

      } else if($injector.has('$routeParams')) {
        var $routeParams = $injector.get('$routeParams');
        cardId = $routeParams.cardId;
        view = $routeParams.view;
      }

      if(cardId) {
        var templateUrl;

        if(view && view === 'summary') {
          templateUrl = decksterPopoutCtrl.getSummaryTemplateUrl(cardId);
        } else {
          templateUrl = decksterPopoutCtrl.getDetailTemplateUrl(cardId);
        }

        var card = new Card({popoutTemplateUrl: templateUrl});

        card.getPopoutContent(function(template) {
          element.html(template);
          $compile(element.contents())(scope);
        });
      }
    }
  };
}]);