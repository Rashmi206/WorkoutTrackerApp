module.exports = function (app) {
  var services = require('./controller');

  app.route('/categories')
    .get(services.list_categories)
    .post(services.add_category)

  app.route('/categories/:categoryId')
    .get(services.get_category)
    .put(services.update_category)
    .delete(services.delete_category)

  app.route('/categoryCollection')
    .get(services.list_categories_collection)
    .post(services.add_categories_collection)

  app.route('/categoryCollection/:categoryCollId')
    .get(services.get_category_collection)
    .put(services.update_category_collection)
    .delete(services.delete_category_collection)
}