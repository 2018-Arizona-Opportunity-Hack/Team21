/**
 * NumbersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 // req.session.userId

module.exports = {
  index: function(req, res){
    res.render('index.ejs', {user: req.session.userId})
  }

};
