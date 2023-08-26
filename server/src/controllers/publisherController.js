const asyncHandler = require('express-async-handler');

const Publisher = require('../models/publisherModel');

const getPublisher = asyncHandler(async (req, res) => {
  const publisher = await Publisher.find();
  res.status(200).json(publisher);
});

const setPublisher = asyncHandler(async (req, res) => {
  const publisher = await Publisher.create({
    name: req.body.name,
    founded: req.body.founded,
  });

  res.status(200).json(publisher);
});

const updatePublisher = asyncHandler(async (req, res) => {
  const publisher = await Publisher.findById(req.params.id);

  if (!publisher) {
    res.status(400);
    throw new Error('Publisher not found');
  }

  const updatedPublisher = await Publisher.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedPublisher);
});

const deletePublisher = asyncHandler(async (req, res) => {
  const publisher = await Game.findById(req.params.id);

  if (!game) {
    res.status(400);
    throw new Error('Publisher not found');
  }

  await publisher.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPublisher,
  setPublisher,
  updatePublisher,
  deletePublisher,
};
