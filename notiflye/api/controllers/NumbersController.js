/**
 * NumbersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 // req.session.userId
const Papa = require('papaparse')
module.exports = {
  index: function(req, res){
<<<<<<< HEAD
    User.findOne({'id': req.session.userId}).exec(function(err, user){
      if (err) {
        return res.serverError(err)
      }
        return res.view('index.ejs', {user: user})

    })

    // res.render('pages/dashboard/welcome.ejs', {user: req.session.userId})

  },
  group: function(req, res){
      User.update({'id': req.session.userId}, req.param('group')).exec(function(err, user){
        if (err) {
          return res.serverError(err)
        }
        return res.send(user)
      })
  },
  upload: function(req, res){
    for (var i = 0; i < req.param('info').length; i++) {
     User.update({'id': req.session.userId} ,{'owner': req.session.userId, 'info': req.param('info')[i]}).exec(function(err, user){
       if (err) {
         return console.log(err)
       }
       console.log(user);
     })
    }
    res.send(200)
  },
  GUpload: function(req, res){
    res.view('upload.ejs')
=======
    res.view('index.ejs', {user: req.session.userId})
  },
  csv: function(req,res){
    res.view('upload.ejs', {})
  },
  parseCSV: function(req, res){s
    let csvString = req.body.csvdata;s
    console.log(Papa.parse(csvString, {header: true}));

>>>>>>> ed64b0f23ba98ef4d399ab26dd077fbc9b7f55af
  }

};
