const request = require("supertest");
const mongoose = require("mongoose");
const Event = require("../Models/Event");
let server;

describe('/api/Event', ()=>{
  beforeEach(() => { server = require("../index")});
  afterEach(() => {server.close();});
  

 describe('post /', ()=>{
    it('create response by filling event form should return 200', async()=>{
      const res = await request(server)
        .post("/api/Events/filleventforms")
        .send({
             
            event_eventName: "party",
            student_id : "kjjjj" ,
            event_id : "hkjjj",
            attendeeName: "hkjhk",
            phoneNumber: 787080,
            email: "gukgukh",
            nationalidCardNumber: 542542
            
            
               
        });
      expect(res.status).toBe(200);
      expect(res.body).not.toBeUndefined();
    })
    
    


describe('get /events', ()=>{
    it('should show all events', async()=>{
      const result = await request(server).get('/api/Events')
      
      expect(result.status).toBe(200)
      
    })
  })
afterAll(async () => await mongoose.disconnect());
afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 1000));
});
 })
})