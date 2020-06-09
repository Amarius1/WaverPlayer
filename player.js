var info = document.getElementById('info');
function onYouTubePlayerAPIReady() {
  var player = new YT.Player('player', {
      videoId: 'I4Gq1u6J8lQ', // this is the id of the video at youtube (the stuff after "?v=")
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
              if (event.data == YT.PlayerState.PLAYING) {
                var url = event.target.getVideoUrl();
                // "http://www.youtube.com/watch?v=gzDS-Kfd5XQ&feature=..."
                var match = url.match(/[?&]v=([^&]+)/);
                // ["?v=gzDS-Kfd5XQ", "gzDS-Kfd5XQ"]
                videoId = match[1];

                $.getJSON( "https://www.googleapis.com/youtube/v3/videos?part=id%2Csnippet&id=" + videoId + "&key=AIzaSyBe5Bxh3H88cRF9U60dnidcIZd70xrWkvM", function( data ) {
                //var obj = $.parseJSON(data);
                    var vidName = data.items[0].snippet.localized.title;
                    document.querySelector('.title').textContent = vidName;
                    window.setInterval(function(){
                        var s = Math.trunc(player.getDuration() - player.getCurrentTime());
                        var minutes = Math.floor(s / 60);
                        var seconds = s - minutes * 60;
                        document.querySelector('[time]').textContent = minutes + ':' + seconds;
                      }, 1000);
                    
                   
                });

                
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
        player.seekTo(skipper + 30);
    });
    $("[prev]").on("mousedown", function() {
        var prevver = player.getCurrentTime();
        player.seekTo(prevver - 30);
    });
    
    $("[party]").on("mousedown", function() {
        player.loadPlaylist({'playlist':['-Rf56TeiEBs', 'I4Gq1u6J8lQ'], 'index': 0});
        player.playVideo() 
    });
    $("[flex]").on("mousedown", function() {
        player.loadPlaylist({'playlist':['Slv9aYoC4FM', 'I4Gq1u6J8lQ'], 'index': 0});
        player.playVideo() 
    });
    $("[reggae]").on("mousedown", function() {
        player.loadPlaylist({'playlist':['gbxxpSNE5o4', 'I4Gq1u6J8lQ'], 'index': 0});
        player.playVideo() 
    });
    $("[skip-next]").on("mousedown", function() {
        player.nextVideo();
    });
    $("[skip-prev]").on("mousedown", function() {
        player.previousVideo();
    });
    $("[dark]").on("mousedown", function() {
        $("body").toggleClass('dark');
    });


   



};





