(function() {
    function SongPlayer() {
         var SongPlayer = {};

         var currentSong = null;
         var currentBuzzObject = null;

         var setSong = function(song) {
           if (currentBuzzObject) {
              currentBuzzObject.stop();
              currentSong.playing = null;
            }

         currentBuzzObject = new buzz.sound(song.audioUrl, {
           formats: ['mp3'],
           preload: true
         });

    currentSong = song;
 };

         SongPlayer.play = function(song) {
           if (currentSong !== song) {
               if (currentBuzzObject) {
                   currentBuzzObject.stop();
                   currentSong.playing = null;
               } else if (currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                      currentBuzzObject.play();
                  }
               }
               // var currentBuzzObject = new buzz.sound(song.audioUrl, {
               currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
               });

               currentSong = song;

               currentBuzzObject.play();
               song.playing = true;
             }
          };

          SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
          };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
