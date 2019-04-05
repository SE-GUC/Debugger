const joi = require('joi')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const Vote = require('../../Models/Vote')

// user is raising a vote by providing his/her id and the person 
// to replace the president's id and when the vote will end  
router
    .route('/')
    .post(async (req, res) => {

    if(!req.body.issuerId) return res.status(400).send(`the issuer id is required`);
    if(!req.body.nomineeId) return res.status(400).send(`the nominee id is required`)
    if(!req.body.voteEndTime) return res.status(400).send(`The vote's ending date is required`);

    try {
        var endDate = new Date(req.body.voteEndTime);
        req.body.voteEndTime = endDate;
        const vote = await Vote.create(req.body)
        return res.send(vote)
    }
    catch(err) {
        return res.status(400).json({ error: `Error, couldn't raise the vote`})
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



