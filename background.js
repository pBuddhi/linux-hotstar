var myurl = "";
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      myurl = request.url;
      chrome.tabs.create({url: chrome.runtime.getURL('video_player.html')});
    }
  }
);

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.executeScript(null,{file:"content.js"});
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.src === "new_tab_script" ) {
      sendResponse({action: "use_url", "url": myurl});
    }
  }
);