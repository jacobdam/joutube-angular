'use strict';

/**
 * @ngdoc function
 * @name jouTubeApp.controller:AppCtrl
 * @description
 * # AboutCtrl
 * Controller of the jouTubeApp
 */
angular.module('jouTubeApp')
  .controller('AppCtrl', function ($scope, $mdSidenav, $state, YouTube) {
    var ctrl = this;
    function toggleSidenav(menuId) {
      $mdSidenav(menuId).toggle();
    };

    function navigateTo(state, params, options) {
      $state.go(state, params, options);
    }

    var startLoadingBestChannels = function() {
      YouTube.getNavBestChannels().then(function(result) {
        ctrl.bestChannels = result;
      });
    };

    this.navigateTo     = navigateTo;
    this.toggleSidenav  = toggleSidenav;

    startLoadingBestChannels();
  });
