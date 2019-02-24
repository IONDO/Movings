
const mongoose = require('mongoose');

const { Schema } = mongoose;

const { ObjectId } = Schema.Types;

const moveSchema = new Schema({
  name: String,
  origin: String,
  destination: String,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
});

const Move = mongoose.model('Move', moveSchema);

module.exports = Move;
