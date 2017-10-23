// angular.module('blocJams', []);
// dependency injection-- th empty array (2nd argumet above) is list of external modules app depends on
// angular.module('blocJams', ['ui.router']);


(function() {
  function config($stateProvider, $locationProvider) {
    $locationProvider    // configure paths - make url look nice, not use #! hashbang
      .html5Mode({
        enabled: true,
        requireBase: false
      });

      // use $stateProvider so app can configure name,url,controller and template
    $stateProvider
      .state('landing', {
        url: '/',
        // instantiate controller
        controller: 'LandingCtrl as landing',
        templateUrl: '/templates/landing.html',
      // });   remove ; to start chaining calls

        controller: 'LandingCtrl as landing'

      })
      .state('album', {
        url: '/album',
        templateUrl: '/templates/album.html'
      })
      .state('collection', {
        url: '/collection',
        // register CollectionCtrl to collection state
        controller: 'CollectionCtrl as collection',
        templateUrl: '/templates/collection.html'
      });
  }

  // angular.module('blocJams', ['ui-router']);
    angular
      .module('blocJams', ['ui.router'])
      .config(config);
})();
