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
            //TODO: Multiple different messages for different formats (email,text)
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
            
            Campaign.findOne({'id': campaignID})
            .exec((error, result) => {
                if(result.groups){
                    let groups = result.groups;
                    let found = false;
                    for(let i = 0; i < groups.length; i++){
                        if(groups[i] == groupID){
                            found = true;
                            console.log(found)
                            res.send("Not adding a duplicate entry")
                            break;
                        }
                    }
                    if(!found){
                        console.log('groups' + groups)
                        groups.push(groupID);
                        Campaign.update({'id': campaignID})
                        .set({groups: groups})
                        .fetch()
                        .exec((queryError, queryResult) =>  {
                            if(queryError){
                                res.send(queryError)
                            }
                            else{
                                res.send(queryResult)
                            }
                        })
                    }
                }
            })


        },
        removeGroup: function(req,res){
            let campaignID = req.params.campaignID;
            let groupID = req.params.groupID;
            Campaign.findOne({'id': campaignID})
            .exec((error, result) => {
                if(!error && result.groups && result.groups.length > 0){
                    console.log("here");
                    let found = false;
                    let groups = result.groups;
                    for(let i = 0; i < groups.length; i++){
                        if(groups[i] == groupID && found == false){
                            groups.splice(i, 1);
                            found = true;
                            Campaign.update({'id': campaignID})
                            .set({groups: groups})
                            .fetch()
                            .exec((queryError, queryResult) =>  {
                                if(queryError){
                                    res.send(queryError)
                                }
                                else{
                                    res.send(queryResult)
                                }
                            })
                        
                        }
                    }

                }
                else {
                    res.send("Cannot find entry");
                }
            })

        }


};
