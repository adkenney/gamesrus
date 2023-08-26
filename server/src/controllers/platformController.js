const asyncHandler = require('express-async-handler');

const Platform = require('../models/platformModel');

const getPlatform = asyncHandler(async (req, res) => {
  const platform = await Platform.find();
  res.status(200).json(platform);
});

const setPlatform = asyncHandler(async (req, res) => {
  const platform = await Platform.create({
    name: req.body.name,
  });

  res.status(200).json(platform);
});

const updatePlatform = asyncHandler(async (req, res) => {
  const platform = await Platform.findById(req.params.id);

  if (!platform) {
    res.status(400);
    throw new Error('Platform not found');
  }

  const updatedPlatform = await Platform.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedPlatform);
});

const deletePlatform = asyncHandler(async (req, res) => {
  const platform = await Platform.findById(req.params.id);

  if (!platform) {
    res.status(400);
    throw new Error('Platform not found');
  }

  await platform.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPlatform,
  setPlatform,
  updatePlatform,
  deletePlatform,
};
