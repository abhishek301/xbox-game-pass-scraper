// function to create a new page with puppeteer
const newPage = async (browser, pageURL, width = 1920, height = 1080) => {
  const page = await browser.newPage();
  await page.setViewport({
    width, // you can set width and height from scaping.js
    height,
  });
  await page.goto(pageURL, {
    waitUntil: 'networkidle2', // wait until network calls complete before continuing
  });
  return page;
};

module.exports = newPage;
