'use strict';

/**
 * @ngdoc function
 * @name jouTubeApp.controller:AppCtrl
 * @description
 * # AboutCtrl
 * Controller of the jouTubeApp
 */
angular.module('jouTubeApp')
  .controller('AppCtrl', function ($scope, $mdSidenav) {
    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

  });
