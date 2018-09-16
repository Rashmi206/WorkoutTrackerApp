const workout_category = require('./models/workout_category');

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
  workout_category.findByIdAndUpdate(req.params.categoryId, {new: true}, req.body, function (err, data) {
    if (err) {
      res.send(err);
    }
    else if(data==null)
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