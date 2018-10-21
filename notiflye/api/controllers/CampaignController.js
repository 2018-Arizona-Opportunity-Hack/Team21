/**
 * CampaignController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

        index: function(req, res){
            res.send("Index Page");
        },
        create: function(req,res){
            let campaignName = req.body.campaignName;
            let campaignMessage = req.body.campaignMessage;
            let targetGroups = [];
            let responses = [];
            let newCampaign = {
                name : campaignName,
                message : campaignMessage,
                groups : targetGroups,
                responses : responses,
            }
            console.log(newCampaign);
            Campaign.create(newCampaign).fetch()
            .exec((error, result) => {
                if(error){
                    res.view('500.ejs');
                } else {
                    res.send(result);
                }
            }
        )
        },
        edit: function(req, res){
            let docID = req.params.id;
            //This just makes the name/message match what we sent in.
            let campaignName = req.body.campaignName;
            let campaignMessage = req.body.campaignMessage;
            Campaign.update({'id': docID}, { name: campaignName, message: campaignMessage})
            .fetch().exec((error, result) => {
                if(error || result.length == 0){
                    //TODO: ERROR PAGE
                    console.log("error");
                    console.log(error);
                }
                else {
                    res.send(result)
                }
            })
        },
        addGroup: async function(req, res){
            let campaignID = req.params.campaignID;
            let groupID = req.params.groupID;
            console.log(campaignID  + " " + groupID)
            var result = Campaign.find({'id': campaignID}).limit(1)
            var found = false
            if (result.groups == undefined) {
              result.groups = [groupID]
            }
            else{
              for (var i = 0; i < result.groups.length; i++) {
                if (groups[i] == groupID) {
                  found = true
                }
              }
              if (found == false) {
                result.groups.append(groupID)
              }

            }
            console.log(result);
            console.log(result.targetGroups)
            var out = await Campaign.update({'id': campaignID}, {'groups': result.targetGroups}).fetch()
            console.log(out);
            return res.send(out)

            //
            // .exec((error, result) => {
            //     console.log("Got here 1111");
            //     console.log(result)
            //     if(error || !result || result.length == 0){
            //         console.log("Got here 2222");
            //         res.send("Unable to find result")
            //         //TODO: Error page
            //     } else {
            //         console.log("Got here 3333");
            //
            //         var foundMatch = false;
            //         var index = 0;

                    // while(!foundMatch && index < result.targetGroups.length){
                    //     if(result.targetGroups[index] == groupID){
                    //         foundMatch = true;
                    //         console.log("Found a match");
                    //     }
                    //     index++;
                    // }
                    // if(!foundMatch){
                    //     console.log("Never found a match")
                    //
                    //     Campaign.addToCollection(campaignID, 'targetGroups')
                    //     .members([groupID])
                    //     .exec((e, m) => {
                    //         console.log("error" + e);
                    //         console.log("msg" + m);
                    //     })
                    //     // result.targetGroups.push(groupID);
                    //     // console.log(result)
                    //     // result.save();
                    // }
                // }
            // })
        }



};
