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
    res.view('upload.ejs', {})

  },
  parseCSV: async function(req, res){
    let csvString = req.body.csvdata;
    let csvData = Papa.parse(csvString, {header: true});
    // console.log(typeof csvData_proto_);

    delete csvData.meta
    delete csvData.errors
    console.log(csvData);
    var postData =  ''
    for (var i = 0; i < csvData.data.length; i++) {
      if (!csvData.data[i].name == '') {
      csvData.data[i].owner = req.session.userId
       postData = await Numbers.create(csvData.data[i]).fetch()
      console.log(postData);
    }
    }
    res.send(postData)
    
    // for ( let i = 0; i < csvData.data.length; i++){
    //   let newEntry = {};
    //   if(csvData.data[i].name && csvData.data[i].phoneNumber)
    //   {
    //     newEntry.name = csvData.data[i].name;
    //     newEntry.phoneNumber = csvData.data[i].phoneNumber;
    //     newEntry.email = csvData.data[i].email;
    //   }
    //   console.log(i + " " + JSON.stringify(newEntry));
    //   Numbers.create(newEntry).exec(function(err, result){
    //     if (err) {
    //       console.log(err)
    //     }
    //     return console.log(result)
    //   });
    // }
      //

  }

};
