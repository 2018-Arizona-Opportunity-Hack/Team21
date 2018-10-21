/**
 * GroupsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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
  }
};
