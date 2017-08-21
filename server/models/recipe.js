var mongoose = require('mongoose');

var Recipe = mongoose.model('Recipe', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  desc: {
    type: String,
    default: "",
    trim: true
  },
  photoURL: {
    type: String,
    default: null,
    trim: true
  },
  ingredients: {
    type: [{
      name: {
        type: String,
        default: "",
        trim: true
      },
      quantity: {
        type: Number,
        default: null
      },
      unit: {
        type: String,
        default: "",
        trim: true
      }
    }],
    default: null
  },
  instructions: {
    type: [{
      name: {
        type: String,
        default: "",
        trim: true
      },
      time: {
        type: Number,
        default: null
      }
    }]
  }
});

module.exports = {Recipe};
