const asyncHandler = require('express-async-handler');
const Genre = require('../models/genreModel');

const getGenre = asyncHandler(async (req, res) => {
  const genre = await Genre.find();
  res.status(200).json(genre);
});

const setGenre = asyncHandler(async (req, res) => {
  const genre = await Genre.create({
    name: req.body.name,
  });

  res.status(200).json(genre);
});

const updateGenre = asyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.status(400);
    throw new Error('Genre not found');
  }
  const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGenre);
});

const deleteGenre = asyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.status(400);
    throw new Error('Genre not found');
  }
  await genre.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGenre,
  setGenre,
  updateGenre,
  deleteGenre,
};
