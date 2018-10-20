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
    res.view('index.ejs', {user: req.session.userId})
  },
  csv: function(req,res){
    res.view('upload.ejs', {})
  },
  parseCSV: function(req, res){s
    let csvString = req.body.csvdata;s
    console.log(Papa.parse(csvString, {header: true}));

  }

};
