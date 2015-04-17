/**
 * CurrenciesController
 *
 * @description :: Server-side logic for managing currencies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
  /**
   * CurrenciesController.getAll()
   */
  getAll: function(req, res, next) {
    console.log(" ----------------CurrenciesController------getAll------ ");
    Currencies.find()
      .exec(function(err, currencies) {
        if (err) return next(err);
        console.log(currencies);
        return res.json(currencies);
      });
  },

  /**
   * CurrenciesController.create()
   */
  create: function(req, res, next) {
    Currencies.create(req.body)
      .exec(function(err, result) {
          if (err) return next(err);
          //res.redirect('currencies')
          return res.json(result);
      });
  },

  view: function(req, res, next) {
    var id = req.param("id", null);
    Currencies.findOne(id).done(function(err, result) {
        if (err) return next(err);
      /*res.render('currencies/view', {
        'model': model
      });*/
        return res.json(result);
    });
  },

  update: function(req, res, next) {
    var id = req.param("id", null);
    currencies.findOne(id).done(function(err, model) {
      if (err) return next(err);
      if (req.method == "POST" && req.param("currencies", null) != null) {
        var p = req.param("currencies", null);
        model.name = p.name;
        model.age = p.age;
        model.save(function(err) {
          if (err) {
            res.send("Error");
          } else {
            res.redirect('currencies/view/' + model.id);
          }
        });
      } else {
        res.render('currencies/update', {
          'model': model
        });
      }
    });
  },

  delete: function(req, res, next) {
    var id = req.param("id", null);
    currencies.findOne(id).done(function(err, user) {
      if (err) return next(err);
      user.destroy(function(err) {
        res.redirect('currencies/index/');
        // record has been removed
      });
    });
  },

};
