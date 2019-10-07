const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema ({

  title: {
    type: String,
    required: true
  },
  yearReleased: {
    type: Number,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

});

module.exports = mongoose.model('Movie', schema);
