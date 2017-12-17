
var xhr = new XMLHttpRequest();
// var pathname = window.location.pathname; // Returns path only
var url  = window.location.href;

// console.log(pathname);
console.log(url);
var lastPart = url.split("/").pop();
console.log(lastPart);
// xhr.open("GET", "http://getcdn.hotstar.com/AVS/besc?action=GetCDN&asJson=Y&channel=TABLET&id="+lastPart+"&type=VOD", false);
// xhr.send();
// var result = xhr.responseText;
xhr.open("GET","http://www.hotstar.com/get_cdn_token.php",false);
xhr.send();
var authTokenObj  = xhr.responseText;
authTokenObj = JSON.parse(authTokenObj);
var tokenObj = authTokenObj.token;
xhr.open("GET","https://secure-getcdn.hotstar.com/AVS/besc?hotstarauth="+tokenObj+"&action=GetCDN&appVersion=5.0.40&asJson=Y&channel=TABLET&id="+lastPart+"&type=VOD",false);
xhr.send();
var result = xhr.responseText;
var obj = JSON.parse(result);
// var obj = JSON.parse(result);
// obj = JSON.parse(obj);
var s = obj.resultObj.src;
if(s!="" && s!=null){
	chrome.runtime.sendMessage({"message": "open_new_tab", "url": s});
}
