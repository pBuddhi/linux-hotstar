// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

// This block is new!
var myurl = "";
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      // chrome.tabs.create({"url": request.url}); 
      console.log("before injected");
      injectScript(request.url);
      console.log("injected");
    }
  }
);
// var first = 'document.addEventListener("DOMContentLoaded", function(){  console.log("in form");  document.getElementById("player-src").value=';
// var second= '; document.getElementById("player-form").submit();}, false);';
// first = 'alert("hello there");';
// second = '';

function injectScript(src) {
  chrome.tabs.create({url : 'http://hlsplayer.net'}, function(tab) { 
    // console.log("in inject");
    // var useurl = src;
    chrome.tabs.executeScript(tab.id, {
      code: 'var useurl ="'+src+'";'
    },function(){
      chrome.tabs.executeScript(tab.id, {file: 'newtabscript.js'});  
    });

    
    // first = 'console.log("'+first+src+second+'");';
    // chrome.tabs.executeScript(tab.id, {code: first});
    // console.log(first+src+second);

    // chrome.tabs.executeScript(tab.id, {code: first+src+second});
    
  });
};

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.executeScript(null,{file:"content.js"});
});