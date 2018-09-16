const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true
  }
});

const Category = mongoose.model('Category', CategorySchema, 'workout_category');
module.exports = Category;