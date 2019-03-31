const request = require("supertest");
const mongoose = require("mongoose");
const VGS_User = require("../Models/VGS_User");
let server;

describe('/api/VGS', ()=>{
  beforeEach(() => { server = require("../index")});
  afterEach(() => {server.close();});
  let newApp;

  describe('post /', ()=>{
    it('create user by filling application form should return 200', async()=>{
      const res = await request(server)
        .post("/api/VGS/application_form")
        .send({
          email: "integration@test",
          clubCommittee: "seee",
          hobbies: "drink water",
          appliedPosition: "member",
          gameName: "claw"
        });
      expect(res.status).toBe(200);
      expect(res.body).not.toBeUndefined();
    })

    it('should return email have to be atleast 3 characters error message', async()=>{
      const res = await request(server)
        .post("/api/VGS/application_form")
        .send({
          email: "12",
          clubCommittee: "se",
          hobbies: "drink water",
          appliedPosition: "member",
          gameName: "claw"
        });
      expect(res.status).toBe(400);
      expect(res.text).toMatch(/length/)
    })

    it('should return email is required error message', async()=>{
      const res = await request(server)
        .post("/api/VGS/application_form")
        .send({
          clubCommittee: "se",
          hobbies: "drink water",
          appliedPosition: "member",
          gameName: "claw"
        });
      expect(res.status).toBe(400);
      expect(res.text).toMatch(/required/)
    })
  })

  describe('get by id', ()=>{
    it("give the application status of the specified application id", async () => {
      newApp = new VGS_User({
      email: "newAppfor@test",
      clubComittee: "testAppstatus",
      hobbies: "die",
      appliedPosition: "member",
      gameName: "ToDie"
     });

    await newApp.save();
    const result = await request(server).get("/api/VGS/application_form_view/" + newApp._id)
    expect(result.status).toBe(200);
    expect(result.text).toMatch("Application Status: pending");
    });

    it(`should be status of 500 with can't find the application form`, async () => {
      const result = await request(server).get("/api/VGS/application_form_view/1");
      expect(result.status).toBe(500);
    });
  })

  describe('get /application_forms_view', ()=>{
    it('should show all the pending application forms', async()=>{
      const result = await request(server).get('/api/VGS/application_forms_view')
      var NotPendingApplications = result.body.filter(app=>app.appStatus!="pending");
      expect(result.status).toBe(200)
      expect(NotPendingApplications!=0).not.toBeTruthy();
    })
  })

  describe('put /application_form_update', ()=>{
    it('should return the application after it has been updated', async()=>{
      let newUpdateUser = new VGS_User({
        email: "testingonrepo@gr.com"
      })
      await newUpdateUser.save()
      const result = await request(server)
        .put('/api/VGS/application_form_update')
        .send({
          email: 'testingonrepo@gr.com',
          clubCommittee: 'here is one',
          hobbies: 'drink water2 integration test'
        })
      expect(result.status).toBe(200)
      expect(result.body).not.toBeNull()
    })

    it('should return status of 400 if the email is not given', async()=>{
      const result = await request(server)
        .put('/api/VGS/application_form_update')
        .send({
          clubCommittee: 'here is one',
          hobbies: 'drink water2'
        })
      expect(result.status).toBe(400)
      expect(result.text).toMatch(/email is required/)
    })

    it('should return status of 400 if the email is wrong', async()=>{
      const result = await request(server)
        .put('/api/VGS/application_form_update')
        .send({
          email: 'bedobedobedo@minions',
          clubCommittee: 'here is one',
          hobbies: 'drink water2'
        })
      expect(result.status).toBe(400)
      expect(result.text).toMatch(/the applicant with this email is not found, check the email/)
    })
  })

  afterAll(async () => await mongoose.disconnect());
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
  });
})

