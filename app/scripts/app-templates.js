(function(module) {
try {
  module = angular.module('decksterTestApp.templates');
} catch (e) {
  module = angular.module('decksterTestApp.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/main.html',
    '<deckster-deck deck-cards="cards" deck-options="testDeckOptions"></deckster-deck>');
}]);
})();
