chrome.runtime.sendMessage({src: "new_tab_script"}, function(response) {
	exeSc(response.url);
});

function exeSc(src){   
    if(Hls.isSupported()) {
	    var video = document.getElementById('video');
	    var hls = new Hls();
	    hls.loadSource(src);
	    hls.attachMedia(video);
	    hls.on(Hls.Events.MANIFEST_PARSED,function() {
	    video.play(); 
  });
 }
}
