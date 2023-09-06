const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GameSchema = new Schema(
  {
    title: { type: String, required: [true, 'Please add a game title'] },
    summary: { type: String, required: [true, 'Please add a game summary'] },
    publisher: {
      type: Schema.Types.ObjectId,
      ref: 'Publisher',
      required: true,
    },
    platform: [
      { type: Schema.Types.ObjectId, ref: 'Platform', required: true },
    ],
    genre: [{ type: Schema.Types.ObjectId, ref: 'Genre', required: true }],
    release_date: { type: Date, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, min: 0 },
    img_url: { type: String },
  },
  { timestamps: true }
);

GameSchema.virtual('url').get(() => {
  return `/game/${this._id}`;
});

module.exports = mongoose.model('Game', GameSchema);
