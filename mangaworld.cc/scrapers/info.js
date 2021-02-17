function Header(key, value) {
  this.key = key;
  this.value = value;
}
function ExtraInfo(value) {
  this.value = value;
}
function Output(
  moduleID,
  image,
  link,
  title,
  description,
  genres,
  type,
  status,
  chapters
) {
  this.moduleID = moduleID;
  this.image = image;
  this.link = link;
  this.title = title;
  this.description = description;
  this.genres = genres;
  this.type = type;
  this.status = status;
  this.chapters = chapters;
}
function Chapters(link, moduleID) {
  this.link = link;
  this.moduleID = moduleID;
}
function InfoObject(
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
var headers = [new Header("", "")];
var extraInfo = [new ExtraInfo("")];
var infoObject;
var output;
var chapters = [];
var type = "";
var status = "";
var genres = [];
var desc = "";
var image = "";
var title = "";
image = document
  .querySelector(
    ".col-12.col-sm-12.col-md-12 > .tab-summary > .summary_image > a > img"
  )
  .getAttribute("data-src");
var typeList = document.querySelectorAll(
  ".summary_content_wrap > .summary_content > .post-content > .post-content_item"
);
for (var i = 0; i < typeList.length; i++) {
  if (typeList[i].querySelector(".summary-heading > h5").innerText == "Type") {
    type = typeList[i].querySelector(".summary-content").innerText;
  }
}
title = document.querySelector(".post-title").innerText;
var statusPage = document.querySelectorAll(".post-status > .post-content_item");
for (var i = 0; i < statusPage.length; i++) {
  if (
    statusPage[i].querySelector(".summary-heading > h5").innerText == "Status"
  ) {
    status = statusPage[i].querySelector(".summary-content").innerText;
  }
}
var linkData = document.head
  .querySelector('link[rel="canonical"]')
  .getAttribute("href");
console.log(linkData);
var genreData = [];
for (var i = 0; i < typeList.length; i++) {
  if (
    typeList[i].querySelector(".summary-heading > h5").innerText == "Genre(s)"
  ) {
    genreData.push(
      typeList[i].querySelectorAll(".summary-content > .genres-content > a")
    );
    console.log(genreData);
    for (var j = 0; j < genreData[0].length; j++) {
      genres.push(genreData[0][j].innerText);
    }
  }
}
var desc = document.querySelectorAll(
  ".depion-summary > .summary__content > p"
)[1].innerHTML;
var chaptersArray = document.querySelectorAll(
  ".listing-chapters_wrap.show-more > .main.version-chap > .wp-manga-chapter > a"
);
for (var x = 0; x < chaptersArray.length; x++) {
  var chapLink = chaptersArray[x].href;
  chapters.push(new Chapters(chapLink, moduleID));
}
chapters.reverse();
output = new Output(
  moduleID,
  image,
  linkData,
  title,
  desc,
  genres,
  type,
  status,
  chapters
);
infoObject = new InfoObject("", "get", headers, extraInfo, "", "", output);
var finalJson = JSON.stringify(infoObject);
savedData.innerHTML = finalJson;
