const Announcement = require('../Models/Announcement')
const clubName = 'VGS'

beforeEach(() => {
    jest.setTimeout(30000);
  });

//  test('All freeSlots related to that specific Head should be shown', async (done) => {
  //  const reset = await Announcement.deleteMany()
    //const create = await Announcement.create(requestBody)
   // expect.assertions(2)
    //const response = await axios.get(
      //'http://localhost:8000/api/announcements/' + clubName
    //);
    //done()
   // expect (response.status).toBe(200); 
    //expect(response.data.data.clubName).toBe('VGS');
    
 // });

 const request = require("supertest");
const mongoose = require("mongoose");
const Announcement = require("../Models/Announcement");

const clubName = "VGS";

let server;
afterAll(async () => {
  await mongoose.connection.close();
});

describe("/api/announcements", () => {
  beforeEach(() => {
    server = require("../index");
  });
  /*beforeEach(() => {
    jest.setTimeout(3000);
  })*/
  afterEach(async () => {
    if (server) await server.close();
  });
})
describe("Returning a list of all announements", () => {
    it("Returning a list of all announcements of a CLub using its clubName and a status of 200", async () => {

        await Announcement.deleteMany({}, (err, result) => {
          if (err) res.status(404).send(err.message);
        });

        const cr = await Announcement.create(requestBody);
        console.log(cr);

        const response = await request(server).get(
          "/api/announcements/" + clubName
        );

        expect(response.body.data[0].clubName).toEqual(clubName);
        expect(response.status).toBe(200);

    }, 10000);
});
