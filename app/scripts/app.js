app = angular.module('decksterTestApp', ['ngRoute', 'angularDeckster', 'decksterTestApp.templates'])// change ngRoute to ui.router to use ui-router instead of ngRoute
.config(['$routeProvider', 'decksterConfigProvider', function($routeProvider, decksterConfigProvider) {
  $routeProvider.when('/', {
    templateUrl: '/main.html',
    controller: 'TestController'
  });

//  $stateProvider
//  .state('main', {
//    url: '/',
//    templateUrl: '/main.html',
//    controller: 'TestController'
//  });


  decksterConfigProvider.set({
    decks: {
      'testDeck': {
        cards: [
          {
            title: 'Charts',
            id: 'chartCard',
            size: {x: 1, y: 3},
            position: [0, 0]
          },
          {
            title: 'Alerts',
            id: 'alertsCard',
            size: {x: 1, y: 3},
            position: [3, 0]
          },
          {
            title: 'Geospatial',
            id: 'mapCard',
            size: {x: 2, y: 4},
            position: [0, 2]
          },
          {
            title: 'Table Data',
            id: 'tableCard',
            size: {x: 1, y: 6},
            position: [0, 1]
          },
          {
            title: 'Timeline',
            id: 'timelineCard',
            size: {x: 3, y: 2},
            position: [4, 2]
          },
          {
            title: 'Node Details',
            id: 'nodeDetailsCard',
            size: {x: 1, y: 4},
            position: [0, 4]
          }
        ]
      }
    },
    cardDefaults: {
      'chartCard': {
        summaryTemplateUrl: 'testSummaryTemplate.html',
        detailTemplateUrl: 'testDetailsTemplate.html'
      },
      'alertsCard': {
        summaryTemplateUrl: 'testSummaryTemplate.html',
        detailTemplateUrl: 'testDetailsTemplate.html'
      },
      'mapCard': {
        summaryTemplateUrl: 'testSummaryTemplate.html',
        detailTemplateUrl: 'testDetailsTemplate.html'
      },
      'timelineCard': {
        summaryTemplateUrl: 'testSummaryTemplate.html',
        detailTemplateUrl: 'testDetailsTemplate.html'
      },
      'nodeDetailsCard': {
        summaryTemplateUrl: 'testSummaryTemplate.html',
        detailTemplateUrl: 'testDetailsTemplate.html'
      },
      'tableCard': {
        summaryTemplateUrl: 'testSummaryTemplate.html',
        detailTemplateUrl: 'testDetailsTemplate.html'
      }
    }
  })
}]);

app.controller('TestController', ['$scope', 'decksterService', function($scope, decksterService) {
  $scope.testDeckOptions = {
    id: 'testDeck',
    gridsterOpts: {
      columns: 5,
      rowHeight: 150,
      margins: [10, 10]
    }
  };

  $scope.cards = [];

  // Setup the cards for this deck
  decksterService.buildCards('testDeck', $scope.cards);

}]);