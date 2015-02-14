var AudioLoader = Loader.extend({
   innerLoad: function (filename) {
       var audio = new Audio('assets/audio/' + filename);
       audio.load();
       return audio;
   }
});