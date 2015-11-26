'use strict';

var OAUTH2_CLIENT_ID = '690796564352-b9p0agthp546etbibtobrrmkb03j6due.apps.googleusercontent.com';

angular.module('jouTubeApp')
  .factory('q', function($q) {
    return function(promise) {
      return $q(function(resolve, reject) {
        promise.then(function() {

        }, reject);
      });
    };
  })

angular.module('jouTubeApp')
  .factory('YouTubeApi', function YouTubeFactory($q) {
    function request(method) {
      var youtube = gapi.client.youtube;
      var parts = method.split('.');
      var restParams = Array.prototype.slice.call(arguments, 1)
      return $q(function(resolve, reject) {
        youtube[parts[0]][parts[1]].apply(youtube[parts[0]], restParams).then(function(response) {
          resolve(response.result, response.headers);
        }, reject);
      });
    };

    return request;
  })
  .factory('YouTube', function(YouTubeApi) {
    function fetchAll(method, params) {
      var items = [];
      var f = function () {
        return YouTubeApi(method, params).then(function (response) {
          items = items.concat(response.items);
          if (response.nextPageToken) {
            params = angular.copy(params);
            params.pageToken = response.nextPageToken;
            return f();
          }
        });
      }
      return f().then(function() {
        return items;
      });
    }

    function getNavBestChannels() {
      return fetchAll('channels.list', {
        part: 'snippet',
        categoryId: 'GCQmVzdCBvZiBZb3VUdWJl'
      });
    }

    return {
      getNavBestChannels: getNavBestChannels
    };
  })
  ;

function handleGAPILoad() {
  function initApp() {
    window.gapi.client.load('youtube', 'v3', function () {
      angular.bootstrap(document.body, ['jouTubeApp']);
    });
  }

  function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      initApp();
    } else {
      window.gapi.load('auth2', function() {
        var auth2 = window.gapi.auth2.init({
          client_id: OAUTH2_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/youtube'
        });
        auth2.signIn().then(function () {
          initApp();
        });
      });
    }
  }

  window.gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/youtube',
    immediate: true
  }, handleAuthResult);
}
