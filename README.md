Angular Deckster
==========================
Angular Deckster is a AngularJS plugin that uses [angular-gridster](http://manifestwebdesign.github.io/angular-gridster/) under the hood to allow a user to quickly bootstrap interactive dashboards.

Think of Angular Deckster as a deck of cards. The deck is the dashboard and the widgets on the dashboard are the cards. Just like a deck of cards you can shuffle
the cards around in the deck by dragging or resizing them.


Goals of Angular Deckster:

1. Allow users to quickly build dashboards in any application with AngularJS
2  Give users the ability to drill down from a summary view of the data to a detailed view
3. Provide users with prepackaged plugins for data visualizations that will reduce development time

##Usage

Here is an example of the default usage:

```html
  <deckster-deck deck-cards="cards" deck-options="deckOptions"></deckster-deck>
```

Which expects a scope setup like the following:

``` javascript

    $scope.deckOptions = {
      gridsterOpts: { // any options that you can set for angular-gridster (see:  http://manifestwebdesign.github.io/angular-gridster/)
        columns: 5,
        rowHeight: 150,
        margins: [10, 10]
      }
    };

    $scope.cards = [
      {
        title: 'Alerts', // Title of the card
        id: 'alertsCard', // This is a unique id required to make popouts work
        size: {x: 1, y: 3}, // Size of the card x being the number columns in deck and y being the number of rows in the deck
        position: [0, 0] // The position of the card in the deck [row, column]
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
```

##Using the Popout feature

The Popout feature allows you to pop a particular card out in a new tab to view its content. This also allows the card
to be visited via the url `/deckster/card/:cardId`.

There are two steps you need to take to ensure the cards ability to popout.

1. Ensure the id and popoutTemplateUrl parameters are set in the card config:
``` javascript
  $scope.cards = [
    {
      title: 'Alerts',
      id: 'alertsCard', // This is a unique id required to make popouts work
      popoutTemplateUrl: 'alertsCardDetail.html', // This is a url to the popout template for this card.
      size: {x: 1, y: 3},
      position: [0, 0]
    }
  ];
```
2. Add the cards popoutTemplate config to the decksterConfig during the configuration of your app.

In order to do this you must inject the decksterConfigProvider into your app configuration and add the cards id and
popoutTemplateUrl to the popoutTemplates object.

``` javascript

  angular.module('decksterTestApp', ['ngRoute', 'angularDeckster'])
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
```

*`Note` in order to make use of this feature your app must use ngRoute for its view routing*


##Installation
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


##Contributing

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

####Style Guide
Please respect the formatting specified in .editorconfig
