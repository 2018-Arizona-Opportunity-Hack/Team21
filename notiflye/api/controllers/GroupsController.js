/**
 * GroupsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let Papa = require('papaparse');
module.exports = {
  create: function(req, res){
    req.body.owner = req.session.userId
    Groups.create(req.body).exec(function(err, user){
      if (err) {
        return res.serverError(err)
      }
      return res.send(user)
    })
  },
  index: function(req, res){
    console.log(req.url);
    url = req.url.split('?id=')[1]
    Numbers.findOne({'id': url}).exec(function(err, user){
      if (err) {
        return res.sendError(err)
      }
      res.send(user)
    })
  },
  getCSV: async function(req, res){
    let group = req.param.group;
    var data = await Numbers.find({'owner': req.session.userId, 'group': {contains: req.param('group')}})
    var csv = Papa.unparse(data);
    res.set('Content-Type', 'text/csv');
    res.send(csv);

    // let group = req.param.group;
    // let json = [];
    
    // Groups.find({'id': id})
    // .limit(1)
    // .exec(async function(error, result){
    //   var data = await Numbers.find({'owner': req.session.userId, 'group': {contains: req.param('group')}})
    //   var csv = Papa.unparse(json);
    //   res.send(csv);
    // })
    // // var csv = Papa.unparse(json);ss
    // // res.send(csv);
  }
};
