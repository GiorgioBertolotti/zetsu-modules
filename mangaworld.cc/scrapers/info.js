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

const savedData = document.getElementById('katsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML);
const moduleID = '199809071';
const headers = [new Header('', '')];
const extraInfo = [new ExtraInfo('')];

const chapters = [];
let type = '';
let status = '';
let genres = [];
let desc = '';
let image = '';
let title = '';

image = document.querySelector('img.rounded').getAttribute('src');

type = document.querySelector(
  '.info > div.meta-data.row > div:nth-child(5) > a'
).innerText;

title = document.querySelector('.info > h1').innerText;

status = document.querySelector(
  '.info > div.meta-data.row.px-1 > div:nth-child(6) > a'
).innerText;

var linkData = document.head
  .querySelector('meta[property=\"og:url\"]')
  .getAttribute('content');

const genresBadges = document
  .querySelector('.info > div.meta-data.row.px-1 > div:nth-child(2)')
  .querySelectorAll('a');
for (let x = 0; x < genresBadges.length; x++) {
  const genreBadge = genresBadges[x];
  genres.push(genreBadge.innerText);
}

desc = document.querySelector('#noidungm').innerHTML;

const chaptersArray = document.querySelectorAll('.chapter');
for (let x = 0; x < chaptersArray.length; x++) {
  const chapter = chaptersArray[x];
  const link = chapter.querySelector('a').href;
  chapters.push(new Chapters(link, moduleID));
}
chapters.reverse();

const output = new Output(
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

const infoObject = new InfoObject(
  '',
  'get',
  headers,
  extraInfo,
  '',
  '',
  output
);

const finalJson = JSON.stringify(infoObject);
savedData.innerHTML = finalJson;
