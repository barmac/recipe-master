const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  desc: {
    type: String,
    default: '',
    trim: true
  },
  photoURL: {
    type: String,
    default: '',
    trim: true
  },
  ingredients: {
    type: [{
      name: {
        type: String,
        default: '',
        trim: true
      },
      quantity: {
        type: Number,
        default: null
      },
      unit: {
        type: String,
        default: '',
        trim: true
      }
    }],
  },
  instructions: {
    type: [{
      name: {
        type: String,
        default: '',
        trim: true
      },
      time: {
        type: Number,
        default: null
      }
    }]
  },
  owner: {
    type: String,
    default: ''
  },
  restricted: {
    type: Boolean,
    default: false
  }
});


module.exports = mongoose.model('Recipe', RecipeSchema);
