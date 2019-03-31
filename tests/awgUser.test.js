const request = require("supertest");
const mongoose = require("mongoose");
const User = require("../Models/User");

const email = "ahmed@gmail.com";
const requestBody = {
  headEmail: "ahmed@gmail.com"
};

let server;
afterAll(async () => {
  await mongoose.connection.close();
});

describe("/api/editUser", () => {
    beforeEach(() => {
      server = require("../index");
    });
    /*beforeEach(() => {
      jest.setTimeout(3000);
    })*/
    afterEach(async () => {
      if (server) await server.close();
    })});

    describe("put method for User is working properly", () => {
        it("updating User by his email", async () => {
    
            await User.deleteMany({}, (err, result) => {
                if (err) res.status(404).send(err.message);
              })
    
           
              await User.create({
                name: "ahmad",
                phoneNumber: "1234567",
                email: "ahmad@gmail.com",
                password: "1234",
                birthday: "12-2-1990",
                studyYear: "3",
                modeOfTran: "car",
                generalAdress: "cairo",
                clubName: "VGS"

              })
    
         
          const response = await request(server)
            .put("/api/editUser/update/")
            .send({
              email: "ahmad@gmail.com",
              oldNumoBeChanged: "1234567",
              newNum: "7890",
            })
    
          const check = await User.findOne({
            email: "ahmad@gmail.com"
          });
    
          console.log(check);
          expect(response.status).toBe(200);
          expect(check.phoneNumber).toBe("7890");
        })});    