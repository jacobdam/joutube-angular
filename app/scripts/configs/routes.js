'use strict';

angular.module('jouTubeApp')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "views/home.html",
        controller: 'HomeCtrl'
      })
  });
