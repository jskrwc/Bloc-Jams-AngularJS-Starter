(function() {
    function AlbumCtrl() {
      //attempt 1
      this.albumData = albumPicasso;
      //appears to work, but do I need below???
      // this.albumData = angular.copy(albumPicasso);
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();
