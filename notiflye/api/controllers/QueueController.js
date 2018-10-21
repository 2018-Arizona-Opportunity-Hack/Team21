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
const nodemailer = require('nodemailer');

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


      nodemailer.createTestAccount((err, account) => {
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
              host: 'smtp.ethereal.email',
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                  user: 'notiflye@gmail.com', // generated ethereal user
                  pass: 'notify123' // generated ethereal password
              }
          });

          // setup email data with unicode symbols
          let mailOptions = {
              from: '"Fred Foo 👻" <foo@example.com>', // sender address
              to: 'bar@example.com, baz@example.com', // list of receivers
              subject: '', // Subject line
              text: 'Hello world?', // plain text body
              // html: '<b>Hello world?</b>' // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
              // Preview only available when sending through an Ethereal account
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          });
      });

    },


};
