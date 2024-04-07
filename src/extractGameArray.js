// function to extract game data from the page and create an array of game objects
const extractGameArray = async (page) => {
  let gameArray = [];
  await new Promise((r) => setTimeout(r, 1000)); // Wait for 1 second between clicks
  await page.waitForSelector('.paginatenum');
  const liElements = await page.$$('.paginatenum'); // select game list
  await new Promise((r) => setTimeout(r, 2000)); // Wait for 1 second between clicks
  for (const li of liElements) {
    // looping through game list elements
    await li.click();
    gameArray = [...gameArray, ...(await formingGameObject(page))];
  }
  return gameArray;
};

// create a game object using puppeteer selectors
const formingGameObject = async (page) => {
  let gameArray = [];
  await page.waitForSelector('.gameDivsWrapper > section'); // Wait for games to load before continuing
  const xboxGameArray = await page.$$('.gameDivsWrapper > section');
  for (const game of xboxGameArray) {
    const imageSrc = await game.$('.c-image');
    const imageSrcString = await page.evaluate((el) => el.getAttribute('src'), imageSrc);
    const name = await game.$('.x1GameName');
    const nameString = await page.evaluate((el) => el.innerText, name);
    const description = await game.$('.popdescription .furthcontent');
    const descriptionString = await page.evaluate((el) => el.innerText, description);
    const platformTags = await game.$$('.furtherplatform .c-tag'); // select on which platform the game is available PC / Xbox
    const multiplayer = await page.evaluate((el) => el.getAttribute('data-multiplayer'), game);
    const rating = await page.evaluate((el) => el.getAttribute('data-rating'), game);
    const listPrice = await page.evaluate((el) => el.getAttribute('data-listprice'), game);
    const gameLink = await game.$('.gameDivLink');
    const gameLinkString = await page.evaluate((el) => el.getAttribute('href'), gameLink);
    let platformTagsArray = [];
    for (const tag of platformTags) {
      // in case of multiple platform looping on all the element
      platformTagsArray = await page.evaluate((el) => el.innerText, tag);
    }

    gameArray.push({
      imageSrc: `https:${imageSrcString}`, // game image in url format
      name: nameString, // game complete name
      description: descriptionString, // small game description
      platformTags: platformTagsArray, // on which platforms game is available
      multiplayer, // if it's a multiplayer game or not
      rating, // meta rating
      price: listPrice, // game price at microsoft store
      link: gameLinkString, //game link to microsoft store
      service: 'Xbox Game Pass', // just a useful tag
    });
  }
  return gameArray;
};

module.exports = extractGameArray;
