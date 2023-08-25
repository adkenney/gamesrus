const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PublisherSchema = new Schema({
  name: { type: String, required: true },
  founded: { type: Date },
});

module.exports = mongoose.model('Publisher', PublisherSchema);
