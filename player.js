var info = document.getElementById('info');
function onYouTubePlayerAPIReady() {
  var player = new YT.Player('player', {
      videoId: 'Slv9aYoC4FM', // this is the id of the video at youtube (the stuff after "?v=")
      loop: true,
      playerVars: { 'autoplay': 0, 'controls': 1, 'playlist':['ptx7UlK9yWg', 'eehbCw95wcc'], },
      events: {
          onReady: function (e) {
                info.innerHTML = 'video is loaded';
                
          },
          
          onStateChange: function (event) {
              if (event.data === 1) {
                  info.innerHTML = 'video started playing';
                  document.querySelector('[play]').textContent = 'pause';
                  $("[play]").addClass("activated");
                  
              }
              else 
              {
                info.innerHTML = 'video paused';
                document.querySelector('[play]').textContent = 'play_arrow';
                $("[play]").removeClass("activated");
              }
             
          }
      }
  });



  function play() {
        player.playVideo() 
        $(this).one("click", pause);
     
    }
    function pause() {
        player.pauseVideo() 
        $(this).one("click", play);

    }
    $("[play]").one("click", play);


    function mute() {
        player.mute() 
        $(this).one("click", unmute);
        document.querySelector('[mute]').textContent = 'volume_off';
        
       
    }
    function unmute() {
        player.unMute() 
        $(this).one("click", mute);
        document.querySelector('[mute]').textContent = 'volume_up';
    }
    $("[mute]").one("click", mute);

    $("[song]").on("mousedown", function() {

        player.loadVideoById({'videoId': 'bHQqvYy5KYo',
               'startSeconds': 5,
               'endSeconds': 60});
    });

    $("[speed='0.25']").on("mousedown", function() {

    player.setPlaybackRate(0.25);
    });
    $("[speed='0.5']").on("mousedown", function() {

    player.setPlaybackRate(0.5);
    });
    $("[speed='1']").on("mousedown", function() {

    player.setPlaybackRate(1);
    });
    $("[speed='1.5']").on("mousedown", function() {

    player.setPlaybackRate(1.5);
    });
    $("[speed='2']").on("mousedown", function() {

        player.setPlaybackRate(2);
    });
    function loop() {
        player.setLoop(true);
        $(this).one("click", noloop);
        $("[loop]").addClass("activated");
       
    }
    function noloop() {
        player.setLoop(false);
        $(this).one("click", loop);
        $("[loop]").removeClass("activated");
       
    }
    $("[loop]").one("click", loop);
    
    
    $("[next]").on("mousedown", function() {
        var skipper = player.getCurrentTime();
        player.seekTo(skipper + 10);
    });
    $("[prev]").on("mousedown", function() {
        var prevver = player.getCurrentTime();
        player.seekTo(prevver - 10);
    });
    $("[party]").on("mousedown", function() {
        player.loadPlaylist({'playlist':['-Rf56TeiEBs', 'eehbCw95wcc'], 'index': 0});
        player.playVideo() 
    });
    $("[flex]").on("mousedown", function() {
        player.loadPlaylist({'playlist':['Slv9aYoC4FM', 'eehbCw95wcc'], 'index': 0});
        player.playVideo() 
    });
    $("[reggae]").on("mousedown", function() {
        player.loadPlaylist({'playlist':['gbxxpSNE5o4', 'eehbCw95wcc'], 'index': 0});
        player.playVideo() 
    });
    $("[skip-next]").on("mousedown", function() {
        player.nextVideo();
    });
    $("[skip-prev]").on("mousedown", function() {
        player.previousVideo();
    });


};

    document.getElementById( "title" ).innerText = player.getVideoData().title;

