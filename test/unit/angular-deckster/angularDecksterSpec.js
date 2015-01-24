'use strict';

describe('', function() {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function(module) {
  return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {

  // Get module
  module = angular.module('angularDeckster');
  dependencies = module.requires;
  });

//  it('should load config module', function() {
//    expect(hasModule('angularDeckster.config')).to.be.ok;
//  });

  
  it('should load filters module', function() {
    expect(hasModule('angularDeckster.filters')).to.be.ok;
  });
  

  
  it('should load directives module', function() {
    expect(hasModule('angularDeckster.directives')).to.be.ok;
  });
  

  
  it('should load services module', function() {
    expect(hasModule('angularDeckster.services')).to.be.ok;
  });
  

});