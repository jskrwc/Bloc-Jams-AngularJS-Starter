(function() {
    /**
    * @function SongPlayer
    * @desc play current song or new song
    * @param {Object} song  Fixtures?
    */
    // function SongPlayer() {      inject the Fixtures service into SongPlayer service - store album info
    // function SongPlayer(Fixtures) {
    // inject $rootScope service as dependency
    function SongPlayer($rootScope, Fixtures) {
         /**
         * @desc object that holds all info about song; also whether song is being played
         * @type {Object}
         */
         var SongPlayer = {};

         /**
         * @desc object that contains the currentAlbum
         * @type {Object}
         */
         var currentAlbum = Fixtures.getAlbum();


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
               SongPlayer.currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
               formats: ['mp3'],
               preload: true
             });

             //Checkpoint 10 -- add $rootScope,$apply event to apply time update
             currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
              });

             SongPlayer.currentSong = song;
         };

 // Assigment 7: new playSong function
         /**
         @function playSong
         @desc Plays the currentBuzz object (song), and sets playing property of song to true
         @param
         */
         var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
         };

// Assignment 8: private stopSong function
        /**
        * @function stopSong
        * @desc Stops the currentBuzzObject, and sets the playing property of the song object to null
        * @param {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };

       /**
       * @function getSongIndex
       * @desc gets index of a song
       @ @type {Object}
       */
        var getSongIndex = function(song) {
          return currentAlbum.songs.indexOf(song);
        };

         /**
         * @desc Active song object from list of songs
         @ @type {Object}
         */
         SongPlayer.currentSong = null;
         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;


         /**
         * @function SongPlayer.play
         * @desc Plays current Object (song) -- checks if diff song, sets to current and plays
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
           song = song || SongPlayer.currentSong;
           if (SongPlayer.currentSong !== song) {
                setSong(song);
                // currentBuzzObject.play();
                // song.playing = true;
                playSong(song);

            }
            else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    // currentBuzzObject.play();
                    playSong(song);
                }
            }
          };

        /**
        * @function SongPlayer.pause
        * @desc Pauses currently playing song (the currentBuzzObject)
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
          currentBuzzObject.pause();
          song.playing = false;
        };

        /**
        * @function SongPlayer.previous
        * @desc gets the current song's index and switches to previous song (or stops if at song 1)
        * @param {Object} song
        */
        SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

          if (currentSongIndex <0) {
            // currentBuzzObject.stop();
            // SongPlayer.currentSong.playing = null;
            stopSong(SongPlayer.currentSong);
          }
          else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
          }
        };

        /**
        * @function SongPlayer.next
        * @desc gets the current song's index and switches to next song in songs array (or stops if last song)
        * @param {Object} song
        */
        SongPlayer.next = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

          if (currentSongIndex == currentAlbum.songs.length) {
            // currentBuzzObject.stop();
            // SongPlayer.currentSong.playing = null;
            stopSong(SongPlayer.currentSong);
          }
          else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
          }
        };


        /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
         SongPlayer.setCurrentTime = function(time) {
             if (currentBuzzObject) {
                 currentBuzzObject.setTime(time);
             }
         };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
