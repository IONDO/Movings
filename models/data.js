
const mongoose = require('mongoose');

const { Schema } = mongoose;

const moveSchema = new Schema({
  name: String,
  origin: String,
  destination: String,
  _id: { type: Schema.Types.ObjectId },
});

const Move = mongoose.model('Move', moveSchema);

module.exports = Move;