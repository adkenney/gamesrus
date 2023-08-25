const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlatformSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: [
      'Sega Saturn',
      'PlayStation',
      'Nintendo 64',
      'Sega Dreamcast',
      'PlayStation 2',
      'Nintendo GameCube',
      'Xbox',
      'Xbox 360',
      'PlayStation 3',
      'Nintendo Wii',
      'Nintendo Wii U',
      'PlayStation 4',
      'Xbox One',
      'Nintendo Switch',
      'Xbox Series X/S',
      'PlayStation 5',
      'PC',
    ],
  },
});

module.exports = mongoose.model('Platform', PlatformSchema);
