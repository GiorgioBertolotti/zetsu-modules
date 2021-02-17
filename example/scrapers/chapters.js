function Header(key, value) {
  this.key = key;
  this.value = value;
}
function ExtraInfo(value) {
  this.value = value;
}
function Output(link, linkIdentifier, moduleID, isDecodable, headers) {
  this.link = link;
  this.moduleID = moduleID;
  this.headers = headers;
}
function ChaptersObject(
  request,
  method,
  headers,
  extraInfo,
  loadJavascript,
  javaScript,
  output
) {
  this.request = request;
  this.method = method;
  this.headers = headers;
  this.extraInfo = extraInfo;
  this.loadJavascript = loadJavascript;
  this.javaScript = javaScript;
  this.output = output;
}
var savedData = document.getElementById("katsu-final-data");
var parsedJson = JSON.parse(savedData.innerHTML);
var moduleID = "9809234289";
var headers = [new Header("Referer", parsedJson.request)];
var extraInfo = [new ExtraInfo("")];
var chaptersObject;
var output = [];
var images = document.querySelectorAll(".page-break.no-gaps > img");
for (var x = 0; x < images.length; x++) {
  var image = images[x].getAttribute("data-src");
  var imageLink = image.trim();
  output.push(new Output(imageLink, "", moduleID, "false", headers));
}
chaptersObject = new ChaptersObject("", "", headers, extraInfo, "", "", output);
var finalJson = JSON.stringify(chaptersObject);
savedData.innerHTML = finalJson;
