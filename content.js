

var firstHref = $("a[href^='http']").eq(0).attr("href");
// alert(firstHref);
console.log(firstHref);
var xhr = new XMLHttpRequest();





// var pathname = window.location.pathname; // Returns path only
var url      = window.location.href;

// console.log(pathname);
console.log(url);
var lastPart = url.split("/").pop();
console.log(lastPart);
xhr.open("GET", "http://getcdn.hotstar.com/AVS/besc?action=GetCDN&asJson=Y&channel=TABLET&id="+lastPart+"&type=VOD", false);
xhr.send();
var result = xhr.responseText;
console.log(result);
// console.log(Object.prototype.toString.call(result));
// result = result.split(",");
// var src = result[result.length-3];
// src = src.substring(7,src.length-1);
// console.log(src);
var obj = JSON.parse(result);
// obj = JSON.parse(obj);
var s = obj.resultObj.src;
console.log(obj.resultObj.src);
// chrome.tabs.create({"url": s});
var arr = s.split(",180");
if(arr.length>1) s = arr[0]+arr[1];
arr = s.split(",400");
if(arr.length>1) s = arr[0]+arr[1];
arr = s.split(",800");
if(arr.length>1) s = arr[0]+arr[1];
arr = s.split(",1300");
if(arr.length>1) s = arr[0]+arr[1];
console.log(s);
console.log("yahan asdfagda");

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = s;

      console.log(firstHref);

      // This line is new!
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    }
  }
);
