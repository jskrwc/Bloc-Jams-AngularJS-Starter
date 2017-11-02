(function() {
    // function AlbumCtrl() {
    // inject custom service Fixtures into AlbumCtrl
    function AlbumCtrl(Fixtures) {
      // this.albumData = albumPicasso;
      //above appears to work, but use below???
      // this.albumData = angular.copy(albumPicasso);
      // now moot anyway bc will use Fixtures service's getAlbum() method
      this.albumData = Fixtures.getAlbum();
    }

    angular
        .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();
