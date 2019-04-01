// import { mongo, Mongoose } from 'mongoose';
const request = require ('supertest')
// const faq = require ('../models/FAQ')
 const mongoose = require("mongoose");

let server;
describe ("/api/faq", ()=> {
    beforeEach(() => {
        server = require('../index')})
    

    afterEach(() => {
        server.close();}),

    

/*describe ('get/getFaq',async () =>{
it ('Appear that the faq is edited', async () =>{
    const result = await request(server).get("api/faq/getFaqs")
     expect(result.ObjectId).toMatch("5c966e60569bd218bcdb2ec0")
     expect(result.text).toMatch(" what about your first oscar")
     expect(result.text).toMatch(" Khalaf")
     expect(result.int).toMatch(1)
     expect(result.text).toMatch("m3rafsh")
     expect(result.text).toMatch("sala")
     expect(result.text).toMatchdate(date.setHours(vdate.getHours()+3))
    
});
});*/



describe('post /', ()=>{
    it('create Questions for the FAQ section by filling application form should return 200', async()=>{
      const res = await request(server)
        .post("/api/faq/create_faq")
        .send({
            question:"what about your first oscar?"
            ,askedBy:"Khalaf?"
            ,noOfTimes:1
            ,answer:"m3rafsh"
           ,answeredBy:"sara"
           ,date: "2019-03-23T17:12:18.000+00:00"})
        
           expect(res.status).toBe(200)
           
        
 
    })



    describe('get /getFaqs', ()=>{
        it('should show all the created FAQs', async()=>{
          const result = await request(server).get('/api/faq/getFaqs')
        //   console.log(result.text)
          expect(result.status).toBe(200)
        })
      })

describe ('post /', () =>{
          it ("edit_faq",async() => {
      const result = await request (server)
       .put("/api/faq/edit_faq/" + '5c966e60569bd218bcdb2ec0')
       .send ({ question:"bt3ml eh ya khalaf?"
               ,askedBy:"bolya?"
               ,noOfTimes:6
               ,answer:"bargos"
              ,answeredBy:"eldahshoury khalaf"
              ,date:"Sat Mar 23 2019 20:12:18"})
              expect(result.status).toBe(200)
              expect(result.body).not.toBeUndefined()
           
        });

        describe('get /getFaqs', ()=>{
            it('should show all the created FAQs after updated', async()=>{
              const result = await request(server).get('/api/faq/getFaqs')
            //   console.log(result.text)
              expect(result.status).toBe(200)
            })
          })














         
//  *//it ('Appear that the faq is edited', async () =>{
//     let vdate = new Date()
//     try{
//         const result = await request(server)
//         .post('/api/faq/getFaqs')
//         .send ({
//             _id:"5c966e60569bd218bcdb2ec0"
//         })
//         expect(result.status).toBe(200)
//     expect(result.body).not.toBeUndefined()
//     }catch(err){
//         console.log(err.uumessage)
//     }
    
    })
    })
    })










   /* describe('get /question  id:', ()=>{
        it(`should return a specific question  only if this question exist`, async()=>{
            let date = new Date();
             newFAQ = new faq({
                ObjectIdId: "5c962b645f726c0ed442fb50",
        
                date: date.setHours(date.getHours()+3)
            })
            await newFAQ.save()
            const res = await request(server).get('/api/getFaqs/'+ newFAQ._id)
            expect(res.body).toHaveProperty('For', 0)
        })
        it(`should return 500 if it's already there `, async()=>{
            const res = await request(server).get('/api/getFaqs/1')
            expect(res.status).toBe(500)
        })
    })*/






    afterAll( ()=> {
        server.close();
        mongoose.disconnect();
            });


            


/*const result = await request(server).get("api/faq/getFaqs")
     expect(result.ObjectId).toMatch("5c966e60569bd218bcdb2ec0")
     expect(result.text).toMatch(" what about your first oscar")
     expect(result.text).toMatch(" Khalaf")
     expect(result.int).toMatch(1)
     expect(result.text).toMatch("m3rafsh")
     expect(result.text).toMatch("sala")
     expect(result.text).toMatchdate(date.setHours(vdate.getHours()+3))*/