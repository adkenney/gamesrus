const asyncHandler = require('express-async-handler');

const Game = require('../models/gameModel');

const getGames = asyncHandler(async (req, res) => {
  const games = await Game.find();
  res.status(200).json(games);
});

const setGames = asyncHandler(async (req, res) => {
  const game = await Game.create({
    title: req.body.title,
    summary: req.body.summary,
    publisher: req.body.publisher,
    platform: req.body.platform,
    genre: req.body.genre,
    stock: req.body.stock,
  });

  res.status(200).json(game);
});

module.exports = {
  getGames,
  setGames,
};
