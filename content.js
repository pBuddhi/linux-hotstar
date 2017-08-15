
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

var obj = JSON.parse(result);
// obj = JSON.parse(obj);
var s = obj.resultObj.src;
if(s!="" && s!=null){
	chrome.runtime.sendMessage({"message": "open_new_tab", "url": s});
}