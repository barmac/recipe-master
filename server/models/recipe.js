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
    default: "",
    trim: true
  },
  photoURL: {
    type: String,
    default: 'https://i.pinimg.com/736x/a3/bb/9d/a3bb9d7e4791220bf19478fb62c63399--drawing-kawaii-food-kawaii-drawings-food-sweets.jpg',
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


module.exports = mongoose.model('Recipe', RecipeSchema);
