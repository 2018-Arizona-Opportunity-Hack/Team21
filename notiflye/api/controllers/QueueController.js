/**
 * QueueController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
require('dotenv').load()
const accountSid =  process.env.twSID;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);


var clockwork = require('clockwork')({key:'521d2baa633d70c49a60614092ed188b6c894da9'});

module.exports = {

    sendQueue: function(req,res){
        let numbers = req.body.queueNumbers.split(",");
        for(let i = 0; i < numbers.length; i++){
          if (numbers[i] != '') {

            client.messages
            .create({
                body: numbers[i],
                from: '+18025481023',
                to: '+14805930557'
            })
            .then(message => {
                console.log(message.sid)
            })
            .done();
        }
        res.send("Sent")
      }


// clockwork.sendSms({ To: '4805930557', Content: 'Test!'},
//   function(error, resp) {
//     if (error) {
//         console.log('Something went wrong', error);
//     } else {
//         console.log('Message sent',resp.responses[0].id);
//     }
// });

    },


};
