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

    delete csvData.meta
    delete csvData.errors
    console.log(csvData);
    var postData =  ''
    var groupData;
    for (var i = 0; i < csvData.data.length; i++) {
      if (!csvData.data[i].name == '') {
      csvData.data[i]['owner'] = req.session.userId
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
}

};
