const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const boxSchema = new Schema({
  name: String,
  description: String,
  moveId: {
    type: ObjectId,
    ref: 'Move',
    required: true,
  },

});

const Box = mongoose.model('Box', boxSchema);

module.exports = Box;
