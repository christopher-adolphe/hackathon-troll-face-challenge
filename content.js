const imageUrl = chrome.extension.getURL('images/troll-face.png')
const bodyElem = document.getElementsByTagName('body')[0];
const trollFaceElem = document.createElement('div');
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
let topVal = getRandomPositionVal(viewportHeight);
let leftVal = getRandomPositionVal(viewportWidth);
let trollFaceTimeoutID;
let trollFaceIntervalID;

/*
* Generates a random value for the position of the Troll face div element
* @param {number} viewportVal - The viewport width or height to use as maximum value to calculate the random position
* @returns {number} The random position value
*/
function getRandomPositionVal(viewportVal) {
    return Math.floor(Math.random() * (viewportVal - 200));;
}

/*
* Generates a random value for the period (between 5 and 30 seconds) after which the Troll face div element should
* appear again
* @returns {number} The random period value
*/
function getRandomPeriod() {
    return Math.floor(Math.random() * 30000) + 5000;
}

/*
* Adds the styles to the div element to display the Troll face and appends the div to the body element
*/
function setTrollFaceStyles() {
    trollFaceElem.id = 'troll-face';
    trollFaceElem.style.width = '200px';
    trollFaceElem.style.height = '200px';
    trollFaceElem.style.position ='absolute';
    trollFaceElem.style.top = `${topVal.toString()}px`;
    trollFaceElem.style.left = `${leftVal.toString()}px`;
    trollFaceElem.style.zIndex = '1000';
    trollFaceElem.style.backgroundImage = `url(${imageUrl})`;
    trollFaceElem.style.backgroundSize = '200px 200px';

    bodyElem.style.position = 'relative';
    bodyElem.appendChild(trollFaceElem);
}

/*
* Hides the Troll face div element
*/
function hideTrollFace() {
    trollFaceElem.style.display = 'none';
}

/*
* Shows the Troll face div element
*/
function showTrollFace() {
    trollFaceElem.style.display = 'block';
}

/*
* Changes the location of Troll face div element by resetting the top and left positions to a new random value and
* also resets the period after which the div element should appear again
*/
function changeLocation() {
    clearTimeout(trollFaceTimeoutID);
    clearInterval(trollFaceIntervalID);

    topVal = getRandomPositionVal(viewportHeight);
    leftVal = getRandomPositionVal(viewportWidth);

    trollFaceElem.style.top = `${topVal.toString()}px`;
    trollFaceElem.style.left = `${leftVal.toString()}px`;

    showTrollFace();
    trollFaceTimeoutID = setTimeout(() => hideTrollFace(), 1000);
    trollFaceIntervalID = setInterval(() => changeLocation(), getRandomPeriod());
}

/*
* Calls setTrollFaceStyles() to add the Troll face element to the DOM
* Sets a timeout to hide the Troll face
* Sets an interval to show the Troll face at a different location
*/
function init() {
    setTrollFaceStyles();
    trollFaceTimeoutID = setTimeout(() => hideTrollFace(), 1000);
    trollFaceIntervalID = setInterval(() => changeLocation(), getRandomPeriod());
}

/*
* Initializes the Troll face extension
*/
init();
