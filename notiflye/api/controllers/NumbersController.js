/**
 * NumbersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 // req.session.userId
const Papa = require('papaparse')

module.exports = {
  index: async function(req, res){
  var user = await  Numbers.find({'owner': req.session.userId})
    res.view('pages/dashboard/welcome.ejs', {user: user})
  },
  csv:  function(req,res){
    Groups.find({}).exec(function(err, group){
      if (err) {
        return res.serverError
      }
      res.view('upload.ejs', {group: group})

    })

  },
  parseCSV: async function(req, res){
    let csvString = req.body.csvdata;
    let csvData = Papa.parse(csvString, {header: true});
    console.log('HERE');
    console.log(req.param('group'))
    delete csvData.meta
    delete csvData.errors
    console.log(csvData);
    var postData =  ''
    var groupData;
    for (var i = 0; i < csvData.data.length; i++) {
      if (!csvData.data[i].name == '') {
      csvData.data[i]['owner'] = req.session.userId
        csvData.data[i]['group'] = req.param('group')

       postData = await Numbers.create(csvData.data[i]).fetch()
      console.log(postData);
    }
    }
    res.send(postData)
  },
search: function(req, res){
console.log(req.param('data'));

  Groups.find({'name': {contains: req.param('data')}}).exec(function(err, user){
    console.log('HERE');
    if (err) {
      console.log(err);
      return res.serverError(err)
    }
    console.log(user);
    return res.send(user)
  })
},
all: async function(req, res){
  var user = await  Numbers.find({'owner': req.session.userId})
    res.view('all.ejs', {user: user})
  }


};
