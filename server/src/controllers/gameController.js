const asyncHandler = require('express-async-handler');

const Game = require('../models/gameModel');

const getGames = asyncHandler(async (req, res) => {
  const games = await Game.find();
  res.status(200).json(games);
});

const setGame = asyncHandler(async (req, res) => {
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

const updateGame = asyncHandler(async (req, res) => {
  const game = await Game.findById(req.params.id);

  if (!game) {
    res.status(400);
    throw new Error('Game not found');
  }

  const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGame);
});

const deleteGame = asyncHandler(async (req, res) => {
  const game = await Game.findById(req.params.id);

  if (!game) {
    res.status(400);
    throw new Error('Game not found');
  }

  await game.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGames,
  setGame,
  updateGame,
  deleteGame,
};
