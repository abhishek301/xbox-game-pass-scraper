const puppeteer = require('puppeteer');
const newPage = require('./newPage');
const extractGameArray = require('./extractGameArray');

// launch puppeteer and create new page with given URL
const scraping = async () => {
  let gameArray = [];
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920, // Set the desired width
      height: 1080, // Set the desired height
    },
  });
  const page = await newPage(browser, 'https://www.xbox.com/en-IN/xbox-game-pass/games#PCgames');
  gameArray = await extractGameArray(page); // Extract the game data from the page
  return gameArray;
};

module.exports = scraping;
