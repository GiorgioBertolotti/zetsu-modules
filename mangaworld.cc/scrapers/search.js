function Header(key, value) {
  this.key = key;
  this.value = value;
}
function ExtraInfo(value) {
  this.value = value;
}
function Output(moduleID, image, link, title, type, voice, stars) {
  this.moduleID = moduleID;
  this.image = image;
  this.link = link;
  this.title = title;
  this.type = type;
  this.voice = voice;
  this.stars = stars;
}
function SearchObject(
  request,
  method,
  headers,
  separator,
  extraInfo,
  loadJavascript,
  javaScript,
  output
) {
  this.request = request;
  this.method = method;
  this.headers = headers;
  this.separator = separator;
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
var searchPageObject;
var output = [];
var mangas = document
  .querySelector(".c-tabs-item")
  .querySelectorAll(".row.c-tabs-item__content");
console.log(mangas);
for (var x = 0; x < mangas.length; x++) {
  var manga = mangas[x];
  var link = manga.querySelector(
    ".col-4.col-12.col-md-2 > .tab-thumb.c-image-hover > a"
  ).href;
  var image = manga
    .querySelector(".col-4.col-12.col-md-2 >.tab-thumb.c-image-hover > a > img")
    .getAttribute("data-src");
  var title = manga.querySelector(
    ".col-4.col-12.col-md-2 > .tab-thumb.c-image-hover > a"
  ).title;
  var type = manga
    .querySelector(
      ".col-8.col-12.col-md-10 > .tab-summary > .post-content > .post-content_item.mg_genres > .summary-content"
    )
    .querySelectorAll("a");
  var typeOutput = "";
  for (var i = 0; i < type.length; i++) {
    if (type[i].innerHTML == "Mature") {
      typeOutput = "18+";
    } else {
      typeOutput = "Safe";
    }
  }
  var authorsList = manga
    .querySelector(
      ".col-8.col-12.col-md-10 > .tab-summary > .post-content > .post-content_item.mg_author > .summary-content"
    )
    .querySelectorAll("a");
  var authors = "";
  for (var i = 0; i < authorsList.length; i++) {
    authors += " " + authorsList[i].innerText;
  }
  var mangaObject = new Output(
    moduleID,
    image,
    link,
    title,
    typeOutput,
    authors,
    "★★★★★"
  );
  output.push(mangaObject);
}
searchPageObject = new SearchObject(
  "",
  "",
  headers,
  "+",
  extraInfo,
  "",
  "",
  output
);
var finalJson = JSON.stringify(searchPageObject);
savedData.innerHTML = finalJson;
