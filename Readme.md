# 🎮 Xbox Game Pass Scraper

<!-- ![Project Image](link/to/image.png) -->

## ⭐ About

The "Xbox Game Pass Scraper" project is a web scraping tool that utilizes Puppeteer.js to extract game data from the official Xbox Game Pass website ([Xbox Game Pass](https://www.xbox.com/en-IN/xbox-game-pass/games)). It gathers information about the games available on Xbox Game Pass, including their names, descriptions, platform compatibility, multiplayer status, ratings, prices, and more.

The scraped data is then stored in a PostgreSQL database, and a RESTful API is created using Node.js and Express.js to provide access to this data. The API allows users to query information about the games available on Xbox Game Pass, facilitating integration with other applications and services.

The project aims to provide a convenient and efficient way to access Xbox Game Pass game data programmatically, enabling developers to build applications, analyze trends, and enhance user experiences related to Xbox Game Pass.

## 🔑 Key Features

- **Web Scraping with Puppeteer.js**: Utilizes Puppeteer.js to scrape game data from the Xbox Game Pass website.
- **Database Storage**: Stores the scraped data in a PostgreSQL database for efficient retrieval.
- **RESTful API**: Creates a RESTful API using Node.js and Express.js to provide access to the scraped game data.
- **Comprehensive Data**: Collects detailed information about each game, including descriptions, platform compatibility, multiplayer status, ratings, and prices.


By using the "Xbox Game Pass Scraper" project, developers can easily access and utilize Xbox Game Pass game data in their applications, enhancing the overall gaming experience for users.


## 🛠️ Prerequisites

Before getting started, ensure you have the following installed on your system:

- Node.js and npm
- PostgreSQL
- Git (optional)

## 🚀 Setup Guide

1. **Clone the Repository:**
    ```sh
        git clone https://github.com/your_username/your_project.git
    ```

2. **Install Dependencies:**
    ```sh
        cd your_project
        npm install
    ```

3. **Set Up PostgreSQL Database:**

    - Create a new PostgreSQL database.
    - Update the database configuration in **[index.js](index.js)** with your credentials.

4. **Run Migrations:**
    ```sh
        npm run migrate
    ```


##  💡 Example

### 🚀 API Endpoint

- **Endpoint:** `/`
- **Method:** `GET`
- **Description:** Retrieve all game data from the database.

### 📋 Example Response

```json

{
  "data": [
    {
      "image_src": "https://store-images.s-microsoft.com/image/apps.57866.13610342535970070.fb34dfda-5ccd-4768-9a7b-0f0c468853e1.6c6bffeb-9f72-41d3-a5b6-51a598072bec?w=200",
      "name": "Lightyear Frontier (Game Preview)",
      "description": "Lightyear Frontier is a peaceful open-world farming adventure on a planet at the far edge of the galaxy.",
      "platformtags": null,
      "multiplayer": true,
      "rating": "7+",
      "link": "https://www.xbox.com/en-in/games/store/lightyear-frontier-game-preview/9NDX2927SND9",
      "service": "Xbox Game Pass",
      "game_id": 1,
      "price": null
    },
    {
      "image_src": "https://store-images.s-microsoft.com/image/apps.3216.14176554647910182.b03fa26e-38ab-4eae-a31e-457e38d3b885.98515c15-2cca-42ec-ad44-9b778e4722f4?w=200",
      "name": "Evil West (Windows)",
      "description": "A dark menace consumes the Old West.  In solo or coop, fight with style in visceral, explosive combat against bloodthirsty monstrosities.",
      "platformtags": null,
      "multiplayer": false,
      "rating": "18+",
      "link": "https://www.xbox.com/en-in/games/store/evil-west-windows/9PC49MD70881",
      "service": "Xbox Game Pass",
      "game_id": 2,
      "price": null
    },
    // More data...
  ],
  "count": 457
}
```

### 🚀 API Endpoint

- **Endpoint:** `/game?search=amnesia`
- **Method:** `GET`
- **Description:** It will return all the games which match the search query.

### 📋 Example Response

```json

{
  "data": [
    {
      "image_src": "https://store-images.s-microsoft.com/image/apps.13587.70644597693904836.cde9dd08-509f-4054-8190-24728e59ad5e.b122adbd-e812-41be-bc09-4dd7b0078036?w=200",
      "name": "Amnesia: Collection",
      "description": "The collection contains three Amnesia titles: The Dark Descent, A Machine For Pigs, and Justine.",
      "platformtags": null,
      "multiplayer": false,
      "rating": "16+",
      "link": "https://www.xbox.com/en-in/games/store/amnesia-collection/9P4LT0VXV12M",
      "service": "Xbox Game Pass",
      "game_id": 111,
      "price": "1624"
    },
    {
      "image_src": "https://store-images.s-microsoft.com/image/apps.10177.14290925569393643.f558cfd6-0d70-43e7-aaba-ddbe80b67784.d7a2a7c7-ecc9-4d9d-9404-a84435fb579d?w=200",
      "name": "Amnesia: Rebirth",
      "description": "A first-person horror adventure.  Uncover your past and survive the Algerian desert.  Fear is your enemy; stay calm to not succumb to an illness threatening you and your loved one.",
      "platformtags": null,
      "multiplayer": false,
      "rating": "18+",
      "link": "https://www.xbox.com/en-in/games/store/amnesia-rebirth/9PMM21KVRD72",
      "service": "Xbox Game Pass",
      "game_id": 112,
      "price": "1974"
    },
    {
      "image_src": "https://store-images.s-microsoft.com/image/apps.11905.14112953128044526.ba95d4f9-17d4-4076-a135-073ccafc4d57.99774603-a61d-41bd-a87d-75435610d053?w=200",
      "name": "Amnesia: The Bunker",
      "description": "Amnesia: The Bunker is a first-person horror game set in a desolate WW1 Bunker. \nFace the oppressing terrors stalking the dark corridors.",
      "platformtags": null,
      "multiplayer": false,
      "rating": "18+",
      "link": "https://www.xbox.com/en-in/games/store/amnesia-the-bunker/9PC15H56NGJK",
      "service": "Xbox Game Pass",
      "game_id": 113,
      "price": "1349"
    }
  ],
  "count": 3
}
```

### 📝 Response Properties

- `data`:               An array of objects containing the retrieved data.
    - `image_src`:      Game image in url format.
    - `name`:           Game complete name.
    - `description`:    Small discription about game.
    - `platformtags`:   On which platforms game is available.
    - `multiplayer`:    If game is multiplayer or not.
    - `rating`:         Meta rating.
    - `link`:           Game link to microsoft Xbox game pass.
    - `service`:        Just a useful tag.
    - `game_id`:        Unique identifier of the data item.
    - `price`:          Game price at microsoft store.
- `count`:              Total Number of items found in database.


##  🕸️ Web Scraping

- Define web scraping logic using Puppeteer in [scraping.js](src/scraping.js) and [extractGameArray.js](src/extractGameArray.js).
- Use Puppeteer to navigate through web pages, extract data, and save it to the database.

##  🌐 REST API

- Define API routes.
- Implement CRUD operations to interact with the database.
- Expose endpoints to access scraped data.


##  🤝 Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow the steps outlined in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

##  📝 License
This project is licensed under the MIT License.