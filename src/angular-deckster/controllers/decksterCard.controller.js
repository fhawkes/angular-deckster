angular.module('angularDeckster.controllers')
.controller('decksterCardCtrl', ['$scope', '$compile', '$window', 'decksterConfig', function($scope, $compile, $window, decksterConfig) {
  var cardEl = null;
  var summaryLoaded = false;
  var detailsLoaded = false;
  var self = this;
  var _origSize = {};
  var _origPos = [];

  $scope.expanded = false;
  $scope.loading = false;
  $scope.currentView = 'summary';

  $scope.toggleView = function() {
    $scope.currentView =  $scope.currentView === 'summary' ? 'details' : 'summary';
    self.loadContent($scope.currentView);
  };

  $scope.expandCard = function() {
    if(!$scope.expanded) {
      self.expandCard();
    } else {
      self.collapseCard();
    }
  };

  $scope.reloadCard = function() {
    self.reloadCard();
  };

  $scope.popoutCard = function() {

  };

  $scope.currentDate = function() {
    return Date.now();
  };

  $scope.hasPopout = function() {
    return self.hasPopout();
  };

  $scope.$on('deckster.cards.refresh', function() {
    self.reloadCard();
  });

  self.setCard = function(el) {
    cardEl = el;
    self.loadCard();
  };

  self.loadCard = function() {
    self.loadCardSummary();

    // If the card is a lazy one just load the summary content
    if(!$scope.card.isLazy()) {
     self.loadCardDetails();
    }
  };

  self.loadCardSummary = function() {
    $scope.loading = true;
    $scope.card.getSummaryContent(function(template) {
      var summaryEl = cardEl.find('.deckster-summary');
      summaryEl.html(template);

      $compile(summaryEl.contents())($scope);
      $scope.loading = false;
      summaryLoaded = true;
    });
  };

  self.loadCardDetails = function() {
    $scope.loading = true;
    $scope.card.getDetailContent(function(template) {
      var detailEl = cardEl.find('.deckster-detail');
      detailEl.html(template);

      $compile(detailEl.contents())($scope);
      $scope.loading = false;
      detailsLoaded = true;
    });
  };

  self.loadContent = function(view) {
    if(view === 'summary' && !summaryLoaded) {
      self.loadCardSummary();
    } else if(!detailsLoaded) {
      self.loadCardDetails();
    }
  };

  self.expandCard = function() {
    var $$window = angular.element($window);
    var maxRows = Math.floor($$window.height() / $scope.gridsterConfig.curRowHeight);

    _origSize = angular.copy($scope.card.size);
    _origPos = angular.copy($scope.card.position);

    $scope.card.size = {x: $scope.gridsterConfig.columns, y: maxRows};
    $scope.card.position = [0, 0];
    $scope.expanded = true;
  };

  self.collapseCard = function() {
    $scope.card.size = _origSize;
    $scope.card.position = _origPos;
    $scope.expanded = false;
  };

  self.hasPopout = function() {
    return angular.isDefined(decksterConfig.cardDefaults[$scope.card.id] && decksterConfig.cardDefaults[$scope.card.id].detailTemplateUrl);
  };

  self.reloadCard = function() {
    self.loadCard();
  };

}]);