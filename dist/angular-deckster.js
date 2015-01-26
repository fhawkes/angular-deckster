(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp


  // Modules
  angular.module('angularDeckster.config', []);
  angular.module('angularDeckster.templates', []);
  angular.module('angularDeckster.directives', ['angularDeckster.config', 'angularDeckster.controllers']);
  angular.module('angularDeckster.filters', []);
  angular.module('angularDeckster.services', []);
  angular.module('angularDeckster.controllers', ['angularDeckster.services']);

  var deckster = angular.module('angularDeckster',
    [
        'angularDeckster.templates',
        'angularDeckster.directives',
        'angularDeckster.filters',
        'angularDeckster.services',
        'angularDeckster.controllers',
        'angularDeckster.config',
        'gridster'
    ]);

  // Route support for
  deckster.config(['$injector', function($injector) {
    // Add routes for ui-router or ngRoute
    if($injector.has('$stateProvider')) {
      var $stateProvider = $injector.get('$stateProvider');

      $stateProvider
      .state('deckster-card', {
        url: '/deckster/card/:cardId',
        templateUrl: '/deckster-popout/popout.html'
      });

    } else if($injector.has('$routeProvider')) {
      var $routeProvider = $injector.get('$routeProvider');

      $routeProvider
      .when('/deckster/card/:cardId', {
        templateUrl: '/deckster-popout/popout.html'
      });
    }

  }]);

  //Config
  angular.module('angularDeckster.config').provider('decksterConfig', function() {
    var options = {
      basePath: '/deckster',
      popoutTemplates: {}
    };

    return {
      set: function(userOptions) {
        angular.extend(options, userOptions);
      },
      $get: function() {
        return options;
      }
    };
  });

})(angular);

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
angular.module('angularDeckster.controllers')
.controller('decksterPopoutCtrl', ['decksterConfig', function(decksterConfig) {
  this.getTemplateUrl = function(cardId) {
    return decksterConfig.cardDefaults[cardId].detailTemplateUrl;
  };
}]);
angular.module('angularDeckster.services')
.factory('Card', ['$http', '$templateCache', '$q', function($http, $templateCache, $q) {
  var defaultConfig = {
    lazyLoad: true,
    summaryTemplateUrl: '/deckster-card/default-summary.html',
    detailTemplateUrl: '/deckster-card/default-detail.html',
    popoutTemplateUrl: '/deckster-card/default-detail.html'
  };

  var fetchPromises = {};  // Promises for content templates

  var Card = function(config) {
    this.updateCardConfig(config);
    // TODO each card must have a card id, and position configs
  };

  Card.prototype.updateCardConfig = function(config) {
    angular.extend(this, defaultConfig, config);
  };

  /**
   * Function that returns the html for the summary section of the card
   * @param cb
   */
  Card.prototype.getSummaryContent = function(cb) {
    fetchTemplate(this.summaryTemplateUrl).then(function(template) {
      cb && cb(template);
    });
  };

  /**
   * Function that returns the html for the detail section of the card
   * @param cb
   */
  Card.prototype.getDetailContent = function(cb) {
    fetchTemplate(this.detailTemplateUrl).then(function(template) {
      cb && cb(template);
    });
  };

  /**
   * Function that returns the html for the popout section of the card
   * @param cb
   */
  Card.prototype.getPopoutContent = function(cb) {
    fetchTemplate(this.popoutTemplateUrl).then(function(template) {
      cb && cb(template);
    });
  };

  Card.prototype.isLazy = function() {
    return this.lazyLoad;
  };

  /**
   * Function returns the title of a card. If the title isn't available it uses the card id.
   * @returns {string} Title of card
   */
  Card.prototype.getTitle = function() {
    return this.title || this.id || '';
  };

  Card.prototype.getPopoutUrl = function() {
    return '#/deckster/card/' + this.id;
  };

  /**
   * Function that first tries to retrieve template from the templateCache and then
   * uses an http request as a fallback. Returns a promise with the html template as the
   * data.
   *
   * @param template url of the template (content)
   * @returns {Promise}
   */
  var fetchTemplate = function(template) {
    if(fetchPromises[template]) {return fetchPromises[template];}
    return (fetchPromises[template] = $q.when($templateCache.get(template) || $http.get(template))
      .then(function(res) {
        if(angular.isObject(res)) {
          $templateCache.put(template, res.data);
          return res.data;
        }
        return res;
      }));
  };

  return Card;
}]);
angular.module('angularDeckster.services')
.factory('decksterService', ['decksterConfig', '$rootScope', function(decksterConfig, $rootScope) {
  return {

    /**
     * Function used to initialized array of cards for a deck
     * @param deckId
     * @param cards $scope variable that is an array of cards to be filled
     */
    buildCards: function(deckId, cards) {
      angular.forEach(decksterConfig.decks[deckId].cards, function(card) {
        card.deckId = deckId;

        // Get card defaults and merge with deck card configs
        cards.push(angular.extend({}, decksterConfig.cardDefaults[card.id], card));
      });
    },

    /**
     * Broadcasts reload event for deck specified by deckId
     * @param deckId
     */
    reloadDeck: function(deckId) {
      $rootScope.$broadcast('deckster.deck.reload.' + deckId);
    }
  };
}]);
angular.module('angularDeckster.directives')
.directive('decksterCard', function() {
  return {
    restrict: 'EA',
    replace: true,
    require: ['^gridster', 'decksterCard'],
    controller: 'decksterCardCtrl',
    templateUrl: '/deckster-card/card.html',
    scope: {
      card: '=cardItem'
    },
    link: function(scope, element, attrs, ctrls) {
      var decksterCardCtrl = ctrls[1];

      scope.gridsterConfig = ctrls[0];

      decksterCardCtrl.setCard(element);

      // Listen for deck refresh
      scope.$on('deckster.deck.reload.' + scope.card.deckId, function() {
        decksterCardCtrl.reloadCard();
      });
    }
  };
});
angular.module('angularDeckster.directives')
.directive('decksterDeck', ['$rootScope', '$parse', function($rootScope, $parse) {
  var options = {
    gridsterOpts: {
      columns: 5,
      margins: [10, 10],
      rowHeight: 150,
      draggable: {
        handle: '.deckster-card-header'
      }
    }
  };

  return {
    replace: true,
    scope: true,
    templateUrl: '/deckster-deck/deck.html',
    controller: 'decksterDeckCtrl',
    link: function(scope, element, attrs, decksterDeckCtrl) {

      scope.deckOptions = angular.extend({}, options, $parse(attrs.deckOptions || {})(scope));

      attrs.$observe('deckCards', function(value) {
        var cards = $parse(value || [])(scope);
        decksterDeckCtrl.initCards(cards);
      });
    }
  };
}]);
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
(function(module) {
try {
  module = angular.module('angularDeckster.templates');
} catch (e) {
  module = angular.module('angularDeckster.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/deckster-card/card.html',
    '<div class="deckster-card-inner"><div class="deckster-card-header"><div class="deckster-card-title">{{card.getTitle()}}</div><div class="deckster-card-controls"><span class="deckster-card-control glyphicon glyphicon-refresh" ng-click="reloadCard()"></span> <span class="deckster-card-control glyphicon" ng-class="{\'glyphicon-resize-full\': !expanded, \'glyphicon-resize-small\': expanded}" ng-click="expandCard(); toggleView()"></span> <a target="_blank" class="deckster-card-control thin glyphicon glyphicon-new-window" ng-href="{{card.getPopoutUrl()}}" ng-if="hasPopout()"></a></div></div><div class="deckster-content"><div class="deckster-summary" ng-show="currentView === \'summary\'"></div><div class="deckster-detail" ng-show="currentView === \'details\'"></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('angularDeckster.templates');
} catch (e) {
  module = angular.module('angularDeckster.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/deckster-card/default-detail.html',
    '<div>This is the detail view of your deckster card. To add your own content set the detailTemplateUrl option in the card options.</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('angularDeckster.templates');
} catch (e) {
  module = angular.module('angularDeckster.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/deckster-card/default-summary.html',
    '<div>This is the summary view of your deckster card. To add your own content set the summaryTemplateUrl option in the card options.</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('angularDeckster.templates');
} catch (e) {
  module = angular.module('angularDeckster.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/deckster-deck/deck.html',
    '<div class="deckster-deck"><div class="deckster-deck-content" gridster="deckOptions.gridsterOpts"><div class="deckster-card" gridster-item="cardConfigMap" ng-repeat="card in cardList"><deckster-card card-item="card"></deckster-card></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('angularDeckster.templates');
} catch (e) {
  module = angular.module('angularDeckster.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/deckster-popout/popout.html',
    '<div class="deckster-popout-wrapper"><deckster-popout></deckster-popout></div>');
}]);
})();
