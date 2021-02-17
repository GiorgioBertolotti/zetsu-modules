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

const savedData = document.getElementById('katsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML);
const moduleID = '199809071';
const headers = [new Header('', '')];
const extraInfo = [new ExtraInfo('')];
const output = [];

const mangas = document
  .querySelector('.comics-grid')
  .querySelectorAll('.entry');

for (let x = 0; x < mangas.length; x++) {
  const manga = mangas[x];

  const link = manga.querySelector('a').href;
  const image = manga.querySelector('a > img').getAttribute('src');
  const title = manga.querySelector('.content > .name > .manga-title').title;
  const type = manga.querySelector('.content > .genre > a').innerText;
  const author = manga.querySelector('.content > .author > a').innerText;

  const mangaObject = new Output(
    moduleID,
    image,
    link,
    title,
    type,
    author,
    '★★★★★'
  );
  output.push(mangaObject);
}

const searchPageObject = new SearchObject(
  '',
  '',
  headers,
  '+',
  extraInfo,
  '',
  '',
  output
);

const finalJson = JSON.stringify(searchPageObject);
savedData.innerHTML = finalJson;
