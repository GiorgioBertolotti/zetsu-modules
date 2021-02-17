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

const savedData = document.getElementById("katsu-final-data");
const parsedJson = JSON.parse(savedData.innerHTML);
const moduleID = "199809071";
const headers = [new Header("", "")];
const extraInfo = [new ExtraInfo("")];
let output = [];
let sectionName = "";
let nextRequest = "";

sectionName = document.querySelector("#popular > div > div > div.s-title > h3")
  .innerText;
let mangasArray = [];
let mangas = document
  .querySelector("#chapters-slide > div.slick-list.draggable > div")
  .querySelectorAll(".slick-active");

for (let x = 0; x < mangas.length; x++) {
  const manga = mangas[x];
  const link = manga.querySelector("a").href;
  const image = manga.querySelector("a > img").getAttribute("src");
  const title = manga.querySelector("p").title;
  const mangaObject = new MangasArray(moduleID, image, link, title);
  mangasArray.push(mangaObject);
}

output.push(new Output(sectionName, mangasArray));

sectionName = document.querySelector(
  "body > div.container > div > div.col-sm-12.col-md-8.col-xl-9 > div.s-title > h3"
).innerText;
mangasArray = [];
mangas = document
  .querySelector(
    "body > div.container > div > div.col-sm-12.col-md-8.col-xl-9 > div.comics-grid"
  )
  .querySelectorAll(".entry");

for (let x = 0; x < mangas.length; x++) {
  const manga = mangas[x];
  const link = manga.querySelector("a").href;
  const image = manga.querySelector("a > img").getAttribute("src");
  const title = manga.querySelector("div > p.name > a.manga-title").title;
  const mangaObject = new MangasArray(moduleID, image, link, title);
  mangasArray.push(mangaObject);
}

output.push(new Output(sectionName, mangasArray));

const mainPageObject = new MainPageObject(
  nextRequest,
  headers,
  "",
  extraInfo,
  "",
  "",
  output
);

const finalJson = JSON.stringify(mainPageObject);
savedData.innerHTML = finalJson;
