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

  angular.module('angularDeckster',
    [
        'angularDeckster.templates',
        'angularDeckster.directives',
        'angularDeckster.filters',
        'angularDeckster.services',
        'angularDeckster.controllers',
        'angularDeckster.config',
        'gridster',
        'ngResource',  // may not need
        'ngSanitize'   // may not need
    ]);

  //Config
  angular.module('angularDeckster.config').provider('decksterConfig', function() {
    var options = {
      basePath: '/deckster'
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
