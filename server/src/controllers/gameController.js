const asyncHandler = require('express-async-handler');

const Game = require('../models/gameModel');

const getGames = asyncHandler(async (req, res) => {
  const games = await Game.find({}).populate('publisher platform genre').exec();
  res.status(200).json(games);
});

const getGameById = asyncHandler(async (req, res) => {
  const game = await Game.findById(req.params.id)
    .populate('publisher platform genre')
    .exec();
  if (!game) {
    res.status(400);
    throw new Error('Game not found');
  }
  res.status(200).json(game);
});

const setGame = asyncHandler(async (req, res) => {
  const game = await Game.create({
    title: req.body.title,
    summary: req.body.summary,
    release_date: req.body.release_date,
    publisher: req.body.publisher,
    platform: req.body.platform,
    genre: req.body.genre,
    price: req.body.price,
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
  getGameById,
  setGame,
  updateGame,
  deleteGame,
};
