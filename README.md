Angular Deckster
==========================
Angular Deckster is a AngularJS plugin that uses [angular-gridster](http://manifestwebdesign.github.io/angular-gridster/) under the hood to allow a user to quickly bootstrap interactive dashboards.

Think of Angular Deckster as a deck of cards. The deck is the dashboard and the widgets on the dashboard are the cards. Just like a deck of cards you can shuffle
the cards around in the deck by dragging or resizing them.


Goals of Angular Deckster:

1. Allow users to quickly build dashboards in any application with AngularJS
2  Give users the ability to drill down from a summary view of the data to a detailed view
3. Provide users with prepackaged plugins for data visualizations that will reduce development time

Installation
---------------
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


Contributing
---------------

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
