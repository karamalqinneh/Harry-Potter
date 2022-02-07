// dependencies
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const axios = require("axios");
const pg = require("pg");
const characterData = require("./mainData/data.json");

// middlewares & environmental variables
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT;
app.use(errorHandler);
const DATABASE_URL = process.env.DATABASE_URL;
const client = new pg.Client(DATABASE_URL);

// constructor to handle the incoming data
class Character {
  constructor(name, house, ancestry, patronus, image) {
    this.name = name;
    this.house = house;
    this.ancestry = ancestry;
    this.patronus = patronus;
    this.image = image;
  }
}

// endpoints
app.get("/", homePageHandler);
app.get("/allCharacters", getAllCharacters);
app.post("/addCharacters", addCharactersHandler);
app.get("*", pageNotFoundHandler);

// endpoints handlers
function homePageHandler(req, res) {
  let characters = [];
  characterData.forEach((ele) => {
    let character = new Character(
      ele.name,
      ele.house,
      ele.ancestry,
      ele.patronus,
      ele.image
    );
    characters.push(character);
  });
  return res.status(200).json(characters);
}

async function getAllCharacters(req, res) {
  let apiData = [];
  await axios
    .get("http://hp-api.herokuapp.com/api/characters")
    .then((value) => {
      value.data.forEach((ele) => {
        let newCharacter = new Character(
          ele.name,
          ele.house,
          ele.ancestry,
          ele.patronus,
          ele.image
        );
        apiData.push(newCharacter);
      });
    });
  return res.status(200).json(apiData);
}

function addCharactersHandler(req, res) {
  let char = req.body;
  console.log(req);
  let sql = `INSERT INTO harryPotterCharacters(CharacterName, house,ancestry,patronus,imageURL) VALUES($1, $2, $3, $4, $5) RETURNING *;`;
  let values = [
    char.name,
    char.house,
    char.ancestry,
    char.patronus,
    char.image,
  ];

  client.query(sql, values).then((data) => {
    return res.status(200).json(data.rows);
  });
}

function pageNotFoundHandler(req, res) {
  return res.status(404).send({
    status: 404,
    responseText: "page not found",
  });
}

function errorHandler(err, req, res, next) {
  res.status(500).send("something went wrong");
}

// app.listen
client.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  });
});
