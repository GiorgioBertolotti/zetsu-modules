function Header(key, value) {
  this.key = key;
  this.value = value;
}
function ExtraInfo(value) {
  this.value = value;
}
function Output(sectionName, mangasArray) {
  this.sectionName = sectionName;
  this.mangasArray = mangasArray;
}
function MangasArray(moduleID, image, link, title) {
  this.moduleID = moduleID;
  this.image = image;
  this.link = link;
  this.title = title;
}
function MainPageObject(
  request,
  headers,
  method,
  extraInfo,
  loadJavascript,
  javaScript,
  output
) {
  this.request = request;
  this.headers = headers;
  this.method = method;
  this.extraInfo = extraInfo;
  this.loadJavascript = loadJavascript;
  this.javaScript = javaScript;
  this.output = output;
}
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
var savedData = document.getElementById("katsu-final-data");
var parsedJson = JSON.parse(savedData.innerHTML);
var moduleID = "9809234289";
var headers = [new Header("", "")];
var extraInfo = [];
var currentPos = parseInt(parsedJson.extraInfo[0].value);
var mainPageObject;
var output = [];
var sectionName = "";
var nextRequest = "";
try {
  nextRequest = parsedJson.extraInfo[currentPos + 1].value;
} catch (e) {
  console.log(e);
}
if (currentPos != 0) {
  output = parsedJson.output;
}
sectionName = document.querySelector(
  ".main-col-inner > .c-page > .entry-header > .entry-header_wrap > .entry-title > .item-title.h4"
).innerText;
var mangasArray = [];
var mangas = document
  .querySelector(".page-content-listing.item-default")
  .querySelectorAll(
    ".page-listing-item > .row.row-eq-height > .col-12.col-md-6.badge-pos-2 > .page-item-detail.manga"
  );
var nextRequest = "";
var currentPos = parseInt(parsedJson.extraInfo[0].value);
try {
  nextRequest = parsedJson.extraInfo[currentPos + 1].value;
} catch (e) {
  console.log(e);
}
for (var x = 0; x < mangas.length; x++) {
  var manga = mangas[x];
  var link = manga.querySelector(".item-thumb.c-image-hover > a").href;
  var image = manga
    .querySelector(".item-thumb.c-image-hover > a > img")
    .getAttribute("data-src");
  var title = manga.querySelector(".item-thumb.c-image-hover > a").title;
  var mangaObject = new MangasArray(moduleID, image, link, title);
  mangasArray.push(mangaObject);
}
output.push(new Output(sectionName, mangasArray));
for (var x = 0; x < parsedJson.extraInfo.length; x++) {
  var object = new ExtraInfo(parsedJson.extraInfo[x].value);
  extraInfo.push(object);
}
extraInfo[0].value = "" + (currentPos + 1);
mainPageObject = new MainPageObject(
  nextRequest,
  headers,
  "",
  extraInfo,
  "",
  "",
  output
);
var finalJson = JSON.stringify(mainPageObject);
savedData.innerHTML = finalJson;
