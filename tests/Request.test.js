const request = require("supertest");

const mongoose = require("mongoose");
const Request = require('../Models/Request') ;
let server ;

describe("/api/requests", () => {
    beforeEach(()=> {server = require('../index')}) 
    afterEach(()=> {server.close()}) 
    let newRequest ;
    let newReq ;

    describe('post /', ()=>{
        it('create new request should return 200', async()=>{
          const res = await request(server)
          
            .post("/api/requests")
            .send({
                sender_email: "merna@test.com",
                reciever_email: "salma @test.com",
                Status: "false",
                request_msg: "member game removal"
              
            });
          expect(res.status).toBe(200);
          expect(res.body).not.toBeUndefined();
        })
        it('should return sender_email and reciever_email have to be atleast 3 characters error message', async()=>{
            const res = await request(server)
              .post("/api/requests")
              .send({
                sender_email: "me",
                reciever_email: "sa",
                Status: "false",
                request_msg: "member game removal"
               
              });
            expect(res.status).toBe(400);
            expect(res.text).toMatch(/length/)
          })

          it('should return sender_email , reciever_email and request_msg required error message', async()=>{
            const res = await request(server)
              .post("/api/requests")
              .send({
                
            
                Status: "false"
                
              });
            expect(res.status).toBe(400);
            expect(res.text).toMatch(/required/)
          })
        })
        
          describe('get /requests', ()=>{
            it('should show all requests', async()=>{
              const result = await request(server).get('/api/requests')
              
              expect(result.status).toBe(200)
              
            })
          })

        

          describe('put /requests', ()=>{
            it('should return the request after it has been updated', async()=>{
              newRequest = new Request({
                sender_email: "samira",
                reciever_email: "waleed",
                Status: "false",
                request_msg: "remove content"
               });
          
              await newRequest.save();
               
              const result = await request(server)
                .put('/api/requests/edit_requests/'+ newRequest._id )
                .send({
                  
                  
                  Status: "true",
                  
                })
              expect(result.status).toBe(200)
              expect(result.body).not.toBeNull()
            
            })

            it('should return status of 400 if id not found ', async()=>{
              const result = await request(server)
                .put('/api/requests/edit_requests/7')
                .send({
                  Status: "false",
                  request_msg: "remove content"
                })
              expect(result.status).toBe(400)
              expect(result.text).toMatch(/cannot edit request  , id not found/)
            })
          }) 

          describe('get by id', ()=> {
            it("give the request with specific id", async () => {
              newReq = new Request({
                sender_email: "samir",
                reciever_email: "wael",
                Status: true ,
                request_msg: "remove content"
             });
        
            await newReq.save();
            const resu = await request(server).get('/api/requests/' + newReq._id)
            expect(resu.text).toMatch(/your request is rejected/) 
            expect(resu.status).toBe(200)
            
            
            }) ;
        
           
          })

    afterAll(async () => await mongoose.disconnect());
    afterAll(async () => {
        await new Promise(resolve => setTimeout(() => resolve(), 1000));
    });

  })
