(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};
    
    var currentAlbum = Fixtures.getAlbum();

    /* *
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;
 
    var getSongIndex = function(song){
      return currentAlbum.songs.indexOf(song);
    }

    /* *
    * @desc Active song object from list of songs
    * @type {Object}
    */
    SongPlayer.currentSong = null;   
    
    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong(song);
      }
 
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
 
      SongPlayer.currentSong = song;
    };






    /* *
    * @function playSong
    * @desc Plays passed in song object
    * @param {Object} song
    */
    function playSong(song){
      if (currentBuzzObject){
        currentBuzzObject.play();
        song.playing = true;
      }
    }

    /* *
    * @function stopSong
    * @desc stop playing song
    */
    function stopSong(song){
      if (currentBuzzObject){
        currentBuzzObject.stop();
        song.playing = null;
      }
    }




    /**
    * @function play
    * @desc Play current or new song
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);

        currentBuzzObject.play();
        song.playing = true;

      } else if (SongPlayer.currentSong === song) {
          if (currentBuzzObject.isPaused()) {
              playSong(song);
          }
      } 
    };

    /**
    * @function pause
    * @desc Pause current song
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    * @function previous
    * @desc Select previous song
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;
      
      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }

    };

    /**
    * @function next
    * @desc Select next song
    */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;
      
      if (currentSongIndex > currentAlbum.songs.length) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }

    };

    return SongPlayer;
  }



  
 
  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);

})();