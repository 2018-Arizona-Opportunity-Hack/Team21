/**
 * NumbersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 // req.session.userId

module.exports = {
  index: function(req, res){
    User.findOne({'id': req.session.userId}).exec(function(err, user){
      if (err) {
        return res.serverError(err)
      }
        return res.view('index.ejs', {user: user})

    })

    // res.render('pages/dashboard/welcome.ejs', {user: req.session.userId})

  },
  group: function(req, res){
      User.update({'id': req.session.userId}, req.params('group')).exec(function(err, user){
        if (err) {
          return res.serverError(err)
        }

      })
  }

};
