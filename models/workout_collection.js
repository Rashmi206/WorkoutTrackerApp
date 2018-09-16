const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const CategoryCollectionSchema = new Schema({
    workout_title: {
        type: String,
        required: true
    },
    workout_note: {
        type: String
    },
    calories_burn_per_min: {
        type: Number,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'workout_category',
        required: true
    }
});

const CategoryCollection = mongoose.model('CategoryCollection', CategoryCollectionSchema, 'category_collection');
module.exports = CategoryCollection;