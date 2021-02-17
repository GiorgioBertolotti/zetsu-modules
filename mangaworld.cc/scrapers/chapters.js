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

const savedData = document.getElementById('katsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML);
const moduleID = '199809071';
const headers = [new Header('Referer', parsedJson.request)];
const extraInfo = [new ExtraInfo('')];
const output = [];

const pNodes = document.querySelectorAll('p');
const lastP = pNodes[pNodes.length - 1];
const mangaworldScript = lastP.innerText;

const firstImage = document
  .querySelector('#page > img')
  .getAttribute('src')
  .trim();
const imageBaseLink = firstImage.substring(0, firstImage.lastIndexOf('/') + 1);

const marker = '\"pages\":[';
const fromPages = mangaworldScript.substring(
  mangaworldScript.indexOf(marker) + marker.length
);
const pagesRaw = fromPages.substring(0, fromPages.indexOf(']'));
const pagesStr = pagesRaw.split(',');

for (let x = 0; x < pagesStr.length; x++) {
  const pageRoute = pagesStr[x].replaceAll('\"', '');
  const image = `${imageBaseLink}${pageRoute}`;
  output.push(new Output(image, '', moduleID, 'false', headers));
}

const chaptersObject = new ChaptersObject(
  '',
  '',
  headers,
  extraInfo,
  '',
  '',
  output
);

const finalJson = JSON.stringify(chaptersObject);
savedData.innerHTML = finalJson;
