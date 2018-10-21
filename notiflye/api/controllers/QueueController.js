/**
 * QueueController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const accountSid =  process.env.twSID;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);
module.exports = {
  
    sendQueue: function(req,res){
        let numbers = req.body.queueNumbers.split(",");
        for(let i = 0; i < numbers.length; i++){
            client.messages
            .create({
                body: numbers[i],
                from: '+18025481023',
                to: '+13304516205'
            })
            .then(message => {
                console.log(message.sid)
            })
            .done();
        }
        res.send("Sent")


        
    }

};

