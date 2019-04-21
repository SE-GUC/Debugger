const joi = require('joi')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const VGS_User = require('../../Models/VGS_User')
const User = require('../../Models/User')
const Vote = require('../../Models/Vote')

// user is raising a vote by providing his/her id and the person 
// to replace the president's id and when the vote will end  
router
    .route('/')
    .post(async (req, res) => {
    try{

        const activeVotes = await Vote.find({voteEndTime: {$gt:new Date()}})
        if(activeVotes.length <= 0){
    
            if(!req.body.issuerId) return res.status(500).send(`the issuer id is required`);
            if(!req.body.nomineeId) return res.status(500).send(`the nominee id is required`)
            if(!req.body.voteEndTime) return res.status(500).send(`The vote's ending date is required`);
        
            try {
                var endDate = new Date(req.body.voteEndTime);
                req.body.voteEndTime = endDate;
                const vote = await Vote.create(req.body)
                return res.status(200).send(vote)
            }
            catch(err) {
                return res.status(500).json({ error: `Error, couldn't raise the vote`})
            }
        }
        else return (res.status(203).send('There is already an active vote'))
    }
    catch(error){
        return res.status(500).json({ error: `Error, couldn't raise the vote`})
    }
})

// here the user provide the initialized vote's id to see
// how many voted YES (for) and how many voted NO (against)
router
    .route('/:voteId')
    .get(async (req, res)=>{
        try{
            let foundVote = await Vote.findById(req.params.voteId)
            if(!foundVote) return res.status(404).send('The vote with the given id is not found')
            let AccepetedVotes = foundVote.voters.filter(x=>x.Decision==true).length;
            let RejectedVotes = foundVote.voters.filter(x=>x.Decision==false).length;
            return res.json({For:AccepetedVotes,Against:RejectedVotes});
        }
        catch(error){
            return res.status(500).send(error.message)
        }

    })

router
    .route('/getting/votes')
    .get(async (req, res)=>{
        try{
            let votes = await Vote.find()
            return res.send(votes)
        }
        catch(error){
            return res.status(404).send('could not get the votes')
        }
    })

router
    .route('/votes/ActiveVote/:uid')
    .get(async (req, res)=>{
        try{
            const lastVote = await Vote.findOne({voteEndTime: {$gt:new Date()}})
            if(lastVote){
                const voteEndDate = new Date(lastVote.voteEndTime).toLocaleString('en-Us');
                const vgsUser = await VGS_User.findById({_id: lastVote.nomineeId})
                
                let lastVoteDecision=null;
                const isVotedBefore = lastVote.voters.find(x=>x.voterID==req.params.uid);
                if(isVotedBefore){
                    lastVoteDecision = isVotedBefore.Decision
                }
                const user = await User.findById({_id: vgsUser.userId})
                let voteData = {
                    nominee: user.name,
                    voteId: lastVote._id,
                    endTime: voteEndDate,
                    lastVote:lastVoteDecision
                }
                return res.send(voteData)
            }
            else return res.status(203).send("there isn't any active vote")
        }
        catch(err){
            return res.status(501).send('could not get the last active vote')
        }
    })

// The user is providing his decision about the vote (yes:true or no:false).
// First, we check if the vote's end time was reached so it's closed.
// Second, we check if he/she already voted before then this means that they want to
// change their decision. Third, if they didnot vote before and the voted didno end yet
// we replace their decision and their id in the voter array
router
    .route('/:voteId')
    .post(async (req, res)=>{
        try{
            const voteId = req.params.voteId
            let foundVote = await Vote.findById(voteId)
            const currentDate = new Date()
            if (currentDate > foundVote.voteEndTime) {
                return(res.send('The vote ended'))
            }
            else {
                const voterID= req.body.voterID
                const voterFound = foundVote.voters.findIndex(x => x.voterID == voterID)
                if(voterFound !=-1) {
                    foundVote.voters[voterFound].Decision = req.body.decision;
                    let votersNewArray = foundVote.voters
                    await foundVote.update({$set: {voters: votersNewArray}})
                    //await Vote.updateOne(foundVote)
                }
                else if(voterFound ==-1 && req.body.decision == true){
                  //  foundVote.accept++
                    foundVote.voters.push({voterID:voterID,Decision:req.body.decision})
                    let votersNewArray = foundVote.voters
                    await foundVote.update({$set: {voters: votersNewArray}})
                    //await Vote.updateOne(foundVote)
                }
                else if (voterFound ==-1 && req.body.decision == false){
                  //  foundVote.reject++
                    foundVote.voters.push({voterID:voterID, Decision:req.body.decision})
                    let votersNewArray = foundVote.voters
                    await foundVote.update({$set: {voters: votersNewArray}})
                    //await Vote.updateOne(foundVote)
                }
            }
            res.send(`your vote has been successfully submitted`)
        }
        catch(error){
            return res.status(404).send('error, vote id not correct')
        }
    })
module.exports = router



