app = angular.module('decksterTestApp', ['ngRoute', 'angularDeckster'])
.config(['$routeProvider', 'decksterConfigProvider', function($routeProvider, decksterConfigProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/main.html',
    controller: 'TestController'
  });

  decksterConfigProvider.set({
    popoutTemplates: {
      'alertsCard': 'testDetailsTemplate.html'
    }
  })
}]);

app.controller('TestController', ['$scope', function($scope) {
  $scope.testDeckOptions = {
    gridsterOpts: {
      columns: 5,
      rowHeight: 150,
      margins: [10, 10]
    }
  };
  $scope.cards = [
    {
      title: 'Alerts',
      id: 'alertsCard',
      summaryTemplateUrl: 'testSummaryTemplate.html',
      detailsTemplateUrl: 'testDetailsTemplate.html',
      size: {x: 1, y: 3},
      position: [0, 0]
    },
    {
      title: 'Events',
      size: {x: 1, y: 3},
      position: [3, 0]
    },
    {
      title: 'Link Analysis',
      size: {x: 2, y: 4},
      position: [0, 2]
    },
    {
      title: 'Node Details',
      size: {x: 1, y: 4},
      position: [0, 4]
    },
    {
      title: 'Timeline',
      size: {x: 3, y: 2},
      position: [4, 2]
    },
    {
      title: 'Network Health',
      size: {x: 1, y: 2},
      position: [2, 1]
    },
    {
      title: 'Geospatial',
      size: {x: 1, y: 2},
      position: [4, 1]
    },
    {
      title: 'Query Builder',
      size: {x: 1, y: 2},
      position: [0, 1]
    }
  ];
}]);