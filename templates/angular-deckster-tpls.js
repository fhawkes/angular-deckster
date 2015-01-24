(function(module) {
try {
  module = angular.module('angularDeckster.templates');
} catch (e) {
  module = angular.module('angularDeckster.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/deckster-card/card.html',
    '<div class="deckster-card-inner"><div class="deckster-card-header"><div class="deckster-card-title">{{card.getTitle()}}</div><div class="deckster-card-controls"><span class="deckster-card-control glyphicon glyphicon-refresh" ng-click="reloadCard()"></span> <span class="deckster-card-control glyphicon" ng-class="{\'glyphicon-resize-full\': !expanded, \'glyphicon-resize-small\': expanded}" ng-click="expandCard(); toggleView()"></span> <span class="deckster-card-control thin glyphicon glyphicon-new-window" ng-click="popoutCard()"></span></div></div><div class="deckster-content"><div class="deckster-summary" ng-show="currentView === \'summary\'"></div><div class="deckster-detail" ng-show="currentView === \'details\'"></div></div></div>');
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
    '<div>This is the detail view of your deckster card. To add your own content set the detailTemplateUrl option in the card options.</div><div>Content loaded: {{currentDate() | date: \'medium\'}}</div>');
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
    '<div>This is the summary view of your deckster card. To add your own content set the summaryTemplateUrl option in the card options.</div><div>Content loaded: {{currentDate() | date: \'medium\'}}</div>');
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
