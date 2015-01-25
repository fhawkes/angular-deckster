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
    $.extend(true, this, defaultConfig, config);
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