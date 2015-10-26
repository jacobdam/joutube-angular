'use strict';

/**
 * @ngdoc function
 * @name jouTubeApp.controller:AppCtrl
 * @description
 * # AboutCtrl
 * Controller of the jouTubeApp
 */
angular.module('jouTubeApp')
  .controller('AppCtrl', function ($scope, $mdSidenav, $state) {
    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

    function navigateTo(state, params, options) {
      $state.go(state, params, options);
    }

    this.navigateTo = navigateTo;
  });
