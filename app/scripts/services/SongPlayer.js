(function() {
    function SongPlayer() {
         var SongPlayer = {};

         var currentSong = null;

         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
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
         /**
         * @function SongPlayer.play
         * @desc Plays current Object (song) -- checks if diff song, sets to current and plays
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
           if (currentSong !== song) {
              //  if (currentBuzzObject) {
              //      currentBuzzObject.stop();
              //      currentSong.playing = null;
              //    }
               //
              //    currentBuzzObject = new buzz.sound(song.audioUrl, {
              //       formats: ['mp3'],
              //       preload: true
              //    });
               //

                // currentSong = song;
                setSong(song);
                // currentBuzzObject.play();
                // song.playing = true;
                this.playSong(song);  //use this bc used var setSong=....

               } else if (currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                      // currentBuzzObject.play();
                      this.playSong(song);
                  }
               }
          };

        /**
        * @function SongPlayer.pause
        * @desc Pauses currently playing song (the currentBuzzObject)
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
          currentBuzzObject.pause();
          song.playing = false;
        };

// Assigment 7: new playSong function
        /**
        @function SongPlayer.playSong
        @desc Plays the currentBuzz object (song), and sets playing property of song to true
        @param
        */
        SongPlayer.playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
      }


        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
