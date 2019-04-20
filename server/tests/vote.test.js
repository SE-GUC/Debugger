const request = require('supertest')
const mongoose = require('mongoose')
const Vote = require('../Models/Vote')
const VGS_User = require("../Models/VGS_User");
let server;
let newVuser;
let newVuser2;

describe("/api/raise_vote", () => {
    beforeEach(()=> {server = require('../index')})
    afterEach(()=> {server.close()})
    let newVote;
    
    describe('get /:voteId', ()=>{
        it(`should return a specific vote's results only if this vote exist`, async()=>{
            newVuser = new VGS_User({
                email: "VgsUserformakingVOTE@test",
                clubComittee: "testVOTEstatus",
                hobbies: "die2",
                appliedPosition: "member",
                gameName: "die2"
            })
            newVuser2 = new VGS_User({
                email: "VgsUserformakingVOTE@test22",
                clubComittee: "testVOTEstatus22",
                hobbies: "die2-22",
                appliedPosition: "member",
                gameName: "die2-22"
            })
            let date = new Date();
            newVote = new Vote({
                issuerId: newVuser._id,
                nomineeId: newVuser2._id,
                voteEndTime: date.setHours(date.getHours()+3)
            })
            await newVote.save()
            const res = await request(server).get('/api/raise_vote/'+ newVote._id)
            expect(res.body).toHaveProperty('For', 0)
        })
        it(`should return 500 if it's an invalid vote id`, async()=>{
            const res = await request(server).get('/api/raise_vote/1')
            expect(res.status).toBe(500)
        })
    })

    describe('post /:voteId', ()=>{
        it('a user is voting and we send that the vote is submmitted', async()=>{
            const res2 = await request(server)
                .post('/api/raise_vote/'+ newVote._id)
                .send( {voterID: newVuser._id, decision: true})
            expect(res2.status).toBe(200)
            expect(res2.text).toMatch(/your vote has been successfully submitted/)
        })
    })

    describe('post /', ()=>{
        it('should sends a vote objest indicating that a vote has been made', async()=>{
            let vDate = new Date()
            const result = await request(server)
                .post('/api/raise_vote')
                .send({issuerId: newVuser._id, 
                       nomineeId: newVuser2._id, 
                       voteEndTime: vDate.setHours(vDate.getHours()+3)
                    })
            expect(result.status).toBe(200)
            expect(result.body).not.toBeUndefined()
        })
    })
    afterAll(async () => await mongoose.disconnect());
    afterAll(async () => {
        await new Promise(resolve => setTimeout(() => resolve(), 1000));
    });
})