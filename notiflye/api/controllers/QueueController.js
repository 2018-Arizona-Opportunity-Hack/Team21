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
let sendText = function(number, subject, content){
    client.messages
        .create({
            body: content,
            from: '+18025481023',
            to: String(number)
        })
        .then(message => {
            console.log(message.sid)
        })
        .done();
}
let sendEmail = function(email, subject, content){
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
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
            to: email,
            subject: subject, // Subject line
            text: content, // plain text body
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
}
module.exports = {

    postCommunications: function(req, res){

        let campaignID = req.param.campaignID;
        let subject = req.param.subject;

        Campaign.find({'id': campaignID})
        .limit(1)
        .exec(function(error, result){
            if(error || !result){
                res.send("Something didnt quite work right, please contact support.");
            } else {
                // console.log("we are here");
                // console.log(result)
                let groupIDS = result[0].groups;
                console.log("gid" + JSON.stringify(groupIDS))
                for( let i = 0; i < groupIDS.length; i++){
                    console.log("k then")
                    console.log(result)
                    let message = result[0].message;
                    let groupID = groupIDS[i].id;
                    console.log(groupID)
                    Groups.find({'id': groupID})
                    .limit(1)
                    .exec(function(e, r){
                        // console.log("e? " + e)
                        // console.log("Group info");
                        // console.log(r)
                        console.log('name' + groupIDS[i].name);
                        Numbers.find({'group': { contains: groupIDS[i].name}}
                        ).exec((error, response) => {
                            console.log("eee" + error);
                            console.log("reeee" + JSON.stringify(response));
                            console.log(r[0]);
                            if(error || !response){
                                res.send("Unable to complete action, please contact support");
                            } else {
                                let peopleToSendTo = [];
                                console.log("len" + response.length);
                                for (let i = 0; i < response.length; i++){
                                    peopleToSendTo.push(
                                        {
                                            contactPreference:['email', 'text'],
                                            phoneNumber: response[i].phoneNumber,
                                            email: response[i].email,
                                        }
                                    )
                                }
                                console.log(peopleToSendTo);



                                for (let i = 0; i < peopleToSendTo.length; i++){
                                    let nonResponder = peopleToSendTo[i];
                                    if(nonResponder.contactPreference.length == 0){
                                        console.log("No more contact preferences");
                                    }
                                    else if(nonResponder.contactPreference[0] == 'email'){
                                        sendEmail(nonResponder.email, subject, message);
                                        nonResponder.contactPreference.shift();
                                    } else if (nonResponder.contactPreference[0] == 'text'){
                                        this.sendText(nonResponder.phoneNumber, subject, messages);
                                        nonResponder.contactPreference.shift();
                                    }
                                }

                            }
                        })


                    })
                }
            }
            console.log(error);
            console.log(result);
        })

    },
    message: async function(req, res){
    var data = await Numbers.find({'owner': req.session.userId, 'group': {contains: req.param('group')}})

    for (var i = 0; i < data.length; i++) {
      sendEmail( data[i].email, req.param('sub'), req.param('msg'));
      sendText(data[i].phoneNumber, req.param('sub'), req.param('msg'));
    }



    },
    sendCommunications: function(req, res){

        let textMessage = "Text Message here";
        let emailContent = "Email content here";
        let subject = "Email subject";
        let NonResponders =
        [
            {'contactPreference': ['email', 'text'],
            'phoneNumber': '+13304516205',
            'email': 'jorlee92@gmail.com'
            }, {'contactPreference': ['email', 'text'],
            'phoneNumber': '+13304516205',
            'email': 'jorlee92@gmail.com'}
        ]

        for (let i = 0; i < NonResponders.length; i++){
            let nonResponder = NonResponders[i];
            if(nonResponder.contactPreference.length == 0){
                console.log("No more contact preferences");
            }
            else if(nonResponder.contactPreference[0] == 'email'){
                sendEmail(nonResponder.email, emailContent);
                nonResponder.contactPreference.shift();
            } else if (nonResponder.contactPreference[0] == 'text'){
                this.sendText(nonResponder.phoneNumber, subject, textMessage);
                nonResponder.contactPreference.shift();
            }
        }

    },
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
                  pass: 'notify' // generated ethereal password
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
