app = angular.module('decksterTestApp', ['angularDeckster']);

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
      summaryTemplateUrl: 'testSummaryTemplate.html',
      size: {x: 1, y: 3},
      position: [0, 0]
    },
    {
      title: 'Events',
      template: 'app/dashboard/widgets/events/Events.tpl.html',
      size: {x: 1, y: 3},
      position: [3, 0]
    },
    {
      title: 'Link Analysis',
      template: 'app/dashboard/widgets/graph/Graph.tpl.html',
      size: {x: 2, y: 4},
      position: [0, 2]
    },
    {
      title: 'Node Details',
      template: 'app/dashboard/widgets/details/Amino.tpl.html',
      size: {x: 1, y: 4},
      position: [0, 4]
    },
    {
      title: 'Timeline',
      template: 'app/dashboard/widgets/timeline/Timeline.tpl.html',
      size: {x: 3, y: 2},
      position: [4, 2]
    },
    {
      title: 'Network Health',
      template: 'app/dashboard/widgets/stats/Stats.tpl.html',
      size: {x: 1, y: 2},
      position: [2, 1]
    },
    {
      title: 'Geospatial',
      template: 'app/dashboard/widgets/map/Map.tpl.html',
      size: {x: 1, y: 2},
      position: [4, 1]
    },
    {
      title: 'Query Builder',
      template: 'app/dashboard/widgets/amino/Amino.tpl.html',
      size: {x: 1, y: 2},
      position: [0, 1]
    }
  ];
}]);