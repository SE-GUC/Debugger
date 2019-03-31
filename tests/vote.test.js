const request = require('supertest')
const mongoose = require('mongoose')
const Vote = require('../Models/Vote')
let server;

describe("/api/raise_vote", () => {
    beforeEach(()=> {server = require('../index')})
    afterEach(()=> {server.close()})
    let newVote;
    
    describe('get /:voteId', ()=>{
        it(`should return a specific vote's results only if this vote exist`, async()=>{
            let date = new Date();
            newVote = new Vote({
                issuerId: "5c962b645f726c0ed442fb50",
                nomineeId: "5c96535984e8734928a52693",
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
                .send( {voterID: "5c96720d551eae18e0fbc750", decision: true})
            expect(res2.status).toBe(200)
            expect(res2.text).toMatch(/your vote has been successfully submitted/)
        })
    })

    describe('post /', ()=>{
        it('should sends a vote objest indicating that a vote has been made', async()=>{
            let vDate = new Date()
            const result = await request(server)
                .post('/api/raise_vote')
                .send({issuerId: "5c9f736b0bf5ff26645376f1", 
                       nomineeId: "5c9f784c7a5a1406849cfcef", 
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