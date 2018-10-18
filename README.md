Angular Deckster
==========================
Angular Deckster is a AngularJS plugin that uses [angular-gridster](http://manifestwebdesign.github.io/angular-gridster/) under the hood to allow a user to quickly bootstrap interactive dashboards.

Think of Angular Deckster as a deck of cards. The deck is the dashboard and the widgets on the dashboard are the cards. Just like a deck of cards you can shuffle
the cards around in the deck by dragging or resizing them.


Goals of Angular Deckster:

1. Allow users to quickly build dashboards in any application with AngularJS
2  Give users the ability to drill down from a summary view of the data to a detailed view
3. Provide users with prepackaged plugins for data visualizations that will reduce development time

## Usage

Here is an example of the default usage:

```html
  <deckster-deck deck-cards="cards" deck-options="deckOptions"></deckster-deck>
```
Configure decks and card defaults using the decksterConfigProvider during the config stage of your app.

Your decksterConfig will contain a decks object which contains configurations for the different decks you plan to use and a cardDefaults object which contains preconfigured defaults for each card.

*`Keep in mind` you can create card defaults that can be used by multiple decks they are just the default values. If you plan on using the same templates in multiple decks then you can reuse the same card defaults.*

Here is an example setup of an app using angular-deckster:
``` javascript
var app = angular.module('decksterTestApp', ['ngRoute', 'angularDeckster'])
  .config(['$routeProvider', 'decksterConfigProvider', function($routeProvider, decksterConfigProvider) {
    $routeProvider.when('/', {
      templateUrl: 'partials/main.html',
      controller: 'TestController'
    });


  decksterConfigProvider.set({
    decks: {
      'testDeck': {
        cards: [
          {
            title: 'Card 1',
            id: 'card-1',
            size: {x: 1, y: 1},
            position: [0, 0]
          },
          {
            title: 'Card 2',
            id: 'card-2',
            size: {x: 1, y: 1},
            position: [0, 1]
          },
          {
            title: 'Card 3',
            id: 'card-3',
            size: {x: 1, y: 1},
            position: [0, 2]
          }
        ]
      }
    },
    cardDefaults: {
      'card-1': {
        summaryTemplateUrl: 'card1SummaryTemplate.html',
        detailTemplateUrl: 'card1DetailsTemplate.html' // Required for popout feature to work
      },
      'card-2': {
        summaryTemplateUrl: 'card2testSummaryTemplate.html',
        detailTemplateUrl: 'card2DetailsTemplate.html'
      },
      'card-3': {
        summaryTemplateUrl: 'card3SummaryTemplate.html',
        detailTemplateUrl: 'card3DetailsTemplate.html'
      }
    })
  }]);
```

Which expects a scope setup like the following:

``` javascript
app.controller('TestController', ['$scope', 'decksterService', function($scope, decksterService) {
  // Deck options you intend to bind to the deck-options attribute
  $scope.deckOptions = {
    id: 'testDeck',
    gridsterOpts: { // any options that you can set for angular-gridster (see:  http://manifestwebdesign.github.io/angular-gridster/)
      columns: 5,
      rowHeight: 150,
      margins: [10, 10]
    }
  };

  // Array that you intend to bind to the deck-cards attribute
  $scope.cards = [];

  // Setup the cards for this deck
  decksterService.buildCards('testDeck', $scope.cards);

}]);
```

## External Card Urls
If the cardDefaults for the card is configured with a summaryTemplateUrl and a detailTemplateUrl the user will have the
ability to visit the card at an external url of `/deckster/card/:cardId/:view` where the view parameter will default to `detail`.

The options for view will be `summary` or `detail`.

## Using the Popout feature

The Popout feature allows you to pop a particular card out in a new tab to view its detail content in a standalone webpage.

To use the popout feature for a particular card you must ensure that the detailTemplateUrl is properly set in the card default configuration.

*`Note` in order to make use of this feature your app must use ngRoute or ui-router for its view routing*


## Installation
        bower install --save angular-deckster

Then, import the following in your HTML alongside `jQuery` and `angular`:
```html
  <link rel="stylesheet" href="bower_components/bootstrap-css-only/css/bootstrap.min.css" />
  <link rel="stylesheet" href="bower_components/angular-gridster/dist/angular-gridster.min.css" />
  <link rel="stylesheet" href="bower_components/angular-deckster/dist/angular-deckster.min.css" />
  <script src="bower_components/javascript-detect-element-resize/jquery.resize.js"></script>
  <script src="bower_components/angular-gridster/dist/angular-gridster.min.js"></script>
  <script src="bower_components/angular-deckster/dist/angular-deckster.js"></script>
```

*`Note` If you include any of the other card-plugins there maybe additional dependencies required*


## Contributing

If you are interested in contributing to the project here are some steps to help you get going:

First clone the project from git:
```bash
  git clone https://github.com/fhawkes/angular-deckster.git
```

Then install project dependencies:
```bash
  npm install
  bower install
```

To watch project changes while you are developing
```bash
  gulp
```

To build the project
```bash
  gulp build
```

#### Style Guide
Please respect the formatting specified in .editorconfig
