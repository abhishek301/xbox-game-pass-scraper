const express = require('express');
const scraping = require('./src/scraping');
const app = express();
const { Client } = require('pg');

const port = 3000; // default port to connect to with localhost

const db = new Client({
  user: 'YOUR_POSTGREQL_USER', // replace this string with your own username
  host: 'localhost',
  database: 'YOUR_DB_NAME', // replace this string with your own database name
  password: 'YOUR_PASSWORD', // replace this string with your own password
  port: 5432, // Default PostgreSQL port
});

db.connect(); // connect to PostgreSQL database

// --------------------------------
// GET | http://localhost:3000/scraping
// It will scrape data from URL and populate the database
// Ideally you should run it only once or it will create duplicate records in the database
// --------------------------------

app.get('/scraping', async (req, res) => {
  const dataArray = await scraping();
  for (const data of dataArray) {
    await db.query(
      `INSERT INTO games (
        image_src,
        name,
        description,
        platformtags,
        multiplayer,
        rating,
        price,
        link,
        service
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        data.imageSrc,
        data.name,
        data.description,
        data.platformtags,
        data.multiplayer,
        data.rating,
        data.price,
        data.link,
        data.service,
      ],
    );
  }
  res.send(dataArray);
});

// --------------------------------
// GET | http://localhost:3000/
// It will return all the games from the database
// --------------------------------

app.get('/', async (req, res) => {
  const gameArray = await db.query(`select * from games`);
  const gameData = { data: gameArray?.rows, count: gameArray.rowCount };
  res.status(200).send(gameData);
});

// --------------------------------
// GET | http://localhost:3000/game?search=call
// It will return all the games which match the search query
// --------------------------------

app.get('/game', async (req, res) => {
  const searchedText = decodeURIComponent(req.query.search);
  const gameArray = await db.query(`SELECT * FROM games WHERE name ILIKE $1`, [
    `%${searchedText}%`,
  ]);
  let gameData;
  if (gameArray?.rows?.length > 0) {
    // checking if any games match the search query
    // return all the games that match the search query
    gameData = { data: gameArray?.rows, count: gameArray.rowCount };
  } else {
    // if there is no game matching the search query

    // WIP:          Isn't working properly.
    // objective:    in case of no game matching the search query api should return similar looking and sounding games
    // observation:  return the same game, even when the search query is different
    const gameSuggestions = await db.query(
      `SELECT * FROM games WHERE similarity(name, $1) > 0.5 LIMIT 10`,
      [searchedText],
    ); // 'similarity' is not inbuild function of PostgreSQL DB >> using 'pg_trgm' extension to perform fuzzy string matching
    gameData = { data: gameSuggestions?.rows, count: gameSuggestions.rowCount };
  }
  res.status(200).send(gameData);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
