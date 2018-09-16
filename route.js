module.exports = function (app) {
  var services = require('./controller');

  app.route('/categories')
    .get(services.list_categories)
    .post(services.add_category)

  app.route('/categories/:categoryId')
    .get(services.get_category)
    .put(services.update_category)
    .delete(services.delete_category)
}