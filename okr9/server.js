const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 5477;
app.use(express.json());

function readGamesFromFile() {
  const rawData = fs.readFileSync('bd.json');
  return JSON.parse(rawData).games;
}

app.get('/', (req, res) => {
  res.send('Добро пожаловать на сервер спорт залов, Босс!');
});
app.get('/games', (req, res) => {
  const games = readGamesFromFile();
  res.json(games);
});

app.get('/games/:id', (req, res) => {
  const games = readGamesFromFile();
  const gameId = req.params.id;
  const game = games.find(g => g.id === gameId);
  if (game) {
    res.json(game);
  } else {
    res.status(404).send('Запись не найдена');
  }
});

app.listen(port, () => {
});
