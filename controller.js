const mongoose = require('mongoose');
const workout_category = require('./models/workout_category');
const category_collection = require('./models/workout_collection');
exports.list_categories = (req, res) => {
  workout_category.find((err, categories) => {
    if (err) {
      res.send(err);
    }
    else {
      res.json(categories);
    }
  });
}

exports.add_category = (req, res, next) => {
  var categoryName = req.body;
  var categoryInstance = new workout_category(categoryName);
  categoryInstance.save((err, doc) => {
    if (err) {
      // res.send(err);
      next(err);
    }
    else {
      res.json({ message: 'Category successfully inserted' });
    }
  })
}

exports.get_category = (req, res) => {
  workout_category.findById(req.params.categoryId, (err, category) => {
    if (err) {
      res.send(err);
    }
    else if (category == null)
      res.json({ message: 'Category doesnot exist' });
    else {
      res.json(category);
    }
  })
}

exports.update_category = (req, res) => {
  workout_category.findByIdAndUpdate(req.params.categoryId, req.body, { new: true }, function (err, data) {
    if (err) {
      res.send(err);
    }
    else if (data == null)
      res.json({ message: 'Category doesnot exist' });
    else {
      res.json({ message: 'Category successfully updated' });
    }
  });
}

exports.delete_category = (req, res) => {
  workout_category.findByIdAndRemove(req.params.categoryId, (err, category) => {
    if (err)
      res.send(err);
    else if (category == null)
      res.json({ message: 'Category doesnot exist' });
    else
      res.json({ message: 'Category successfully deleted' });
  })
}

exports.list_categories_collection = (req, res) => {
  category_collection.aggregate([{
    $lookup: {
      from: 'workout_category', localField: 'category_id',
      foreignField: '_id', as: 'category_name'
    }
  },
  { "$unwind": "$category_name" },
  { $project: { 'workout_title': 1, 'workout_note': 1, 'calories_burn_per_min': 1, 'category_name.categoryName': 1 } }]).exec((err, data) => {
    if (err)
      res.send(err);
    else
      res.json(data);
  })
}

exports.add_categories_collection = (req, res) => {
  var categoryCollection = req.body;
  var categoryCollInstance = new category_collection(categoryCollection);
  categoryCollInstance.save((err, doc) => {
    if (err) {
      // res.send(err);
      next(err);
    }
    else {
      res.json({ message: 'Category Collection successfully inserted' });
    }
  })
}

exports.get_category_collection = (req, res) => {
  category_collection.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(req.params.categoryCollId) } },
    {
      $lookup: {
        from: 'workout_category', localField: 'category_id',
        foreignField: '_id', as: 'category_name'
      }
    },
    { "$unwind": "$category_name" },
    { $project: { 'workout_title': 1, 'workout_note': 1, 'calories_burn_per_min': 1, 'category_name.categoryName': 1 } }]).exec((err, data) => {
      if (err)
        res.send(err);
      else if (typeof data == 'undefined' || data.length == 0)
        res.json({ message: 'Category Collection doesnot exist' });
      else
        res.json(data);
    })
}

exports.update_category_collection = (req, res) => {
  category_collection.findByIdAndUpdate(req.params.categoryCollId, req.body, { new: true }, function (err, data) {
    if (err) {
      res.send(err);
    }
    else if (data == null)
      res.json({ message: 'Category Collection doesnot exist' });
    else {
      res.json({ message: 'Category Collection successfully updated' });
    }
  });
}

exports.delete_category_collection = (req, res) => {
  category_collection.findByIdAndRemove(req.params.categoryCollId, (err, category) => {
    if (err)
      res.send(err);
    else if (category == null)
      res.json({ message: 'Category Collection doesnot exist' });
    else
      res.json({ message: 'Category Collection successfully deleted' });
  })
}