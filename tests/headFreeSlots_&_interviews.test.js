//const funcs = require("././functions");
/*const axios = require("axios");
const HeadFreeSlot = require('../Models/HeadFreeSlot')

const email = 'ahmed@gmail.com'
const requestBody = {

  headEmail: 'ahmed@gmail.com',
  day: 'Monday',
  date: '11-09-2019',
  slot: '2nd'

};
beforeEach(() => {
    jest.setTimeout(30000);
  });

test('All freeSlots related to that specific Head should be shown', async (done) => {
  const reset = await HeadFreeSlot.deleteMany()
  const create = await HeadFreeSlot.create(requestBody)
  expect.assertions(2)
  const response = await axios.get(
    'http://localhost:8000/api/headFreeSlots/' + email
  );
  done()
 // expect (response.status).toBe(200); 
  expect(response.data.data.headEmail).toBe('ahmed@gmail.com');
  
});
*/

const request = require("supertest");
const mongoose = require("mongoose");
const HeadFreeSlot = require("../Models/HeadFreeSlot");
const Interview = require("../Models/Interview");

const email = "ahmed@gmail.com";
const requestBody = {
  headEmail: "ahmed@gmail.com",
  day: "Monday",
  date: "11-09-2019",
  slot: "2nd"
};

let server;
afterAll(async () => {
  await mongoose.connection.close();
});

describe("/api/headFreeSlots & /api/interviews", () => {
  beforeEach(() => {
    server = require("../index");
  });
  /*beforeEach(() => {
    jest.setTimeout(3000);
  })*/
  afterEach(async () => {
    if (server) await server.close();
  });

  describe("post method for HeadFreeSlots is working properly", () => {
    it("creating a new headFreeSlot", async () => {
      const response = await request(server)
        .post("/api/headFreeSlots/add")
        .send({
          email: "tamer@gmail.com",
          day: "Monday",
          date: "11-09-2019",
          slot: "3rd"
        });

      const check = await HeadFreeSlot.findOne({
        headEmail: "tamer@gmail.com"
      });
      const interview = await Interview.findOne({
        interviewerEmail: "tamer@gmail.com"
      });
      console.log(check);
      expect(response.status).toBe(200);
      expect(check.headEmail).toBe("tamer@gmail.com");
      expect(interview.interviewerEmail).toBe("tamer@gmail.com");
    });
  });

  describe("Returning a list of all free slots of a Head", () => {
    it("Returning a list of all free slots of a Head using his email and a status of 200", async () => {
      
        await HeadFreeSlot.deleteMany({}, (err, result) => {
          if (err) res.status(404).send(err.message);
        });

        const cr = await HeadFreeSlot.create(requestBody);
        console.log(cr);

        const response = await request(server).get(
          "/api/headFreeSlots/" + email
        );

        expect(response.body.data[0].headEmail).toEqual(email);
        expect(response.status).toBe(200);

    }, 10000);
  });

  describe("put method for HeadFreeSlots is working properly", () => {
    it("updating freeSlot of a Head by his email", async () => {

        await HeadFreeSlot.deleteMany({}, (err, result) => {
            if (err) res.status(404).send(err.message);
          })
          
        await Interview.deleteMany({}, (err, result) => {
            if (err) res.status(404).send(err.message);
          })

          await HeadFreeSlot.create({
            headEmail: "dodo@gmail.com",
            day: "Monday",
            date: "11-09-2019",
            slot: "3rd"
          })

          await Interview.create({
            interviewerEmail: 'dodo@gmail.com'
            , intervieweeEmail: null
            , day: 'Monday'
            , date: '11-09-2019'
            , interviewslot: '3rd'
            , startTime: null
            , endTime: null
            , interview: false
        })

      const response = await request(server)
        .put("/api/headFreeSlots/update/")
        .send({
          email: "dodo@gmail.com",
          oldDayToBeChanged: "Monday",
          oldDateToBeChanged: "11-09-2019",
          oldSlotToBeChanged: "3rd",
          newDay: "Tuesday",
          newDate: "11-10-2019",
          newSlot: "4th"
        })

      const check = await HeadFreeSlot.findOne({
        headEmail: "dodo@gmail.com"
      });

      console.log(check);
      expect(response.status).toBe(200);
      expect(check.day).toBe("Tuesday");
    });

    it("updating freeSlot cannot be executed in case this slot contains an interview", async () => {
      const response = await request(server)
        .put("/api/headFreeSlots/update/")
        .send({
          email: "fawzy@gmail.com",
          oldDayToBeChanged: "Monday",
          oldDateToBeChanged: "11-09-2019",
          oldSlotToBeChanged: "2nd",
          newDay: "Tuesday",
          newDate: "11-10-2019",
          newSlot: "4th"
        });

      await HeadFreeSlot.create({
        headEmail: "fawzy@gmail.com",
        day: "Monday",
        date: "11-09-2019",
        slot: "2nd"
      });

      await Interview.create({
        interviewerEmail: "fawzy@gmail.com",
        intervieweeEmail: "mohamed@gmail.com",
        day: "Monday",
        date: "11-09-2019",
        interviewslot: "2nd",
        startTime: "10:00",
        endTime: "10:30",
        interview: true
      });

      const check = await HeadFreeSlot.findOne({
        headEmail: "fawzy@gmail.com"
      });
      console.log(check);
      expect(response.status).toBe(404);
      expect(check.slot).not.toBe("4th");
    });
  });

  describe("Returning a list of all interviews", () => {
    it("Returning a list of all interviews and a status of 200", async () => {
      await HeadFreeSlot.deleteMany({}, (err, result) => {
        if (err) res.status(404).send(err.message);
      });

      await HeadFreeSlot.create(requestBody);

      await Interview.deleteMany({}, (err, result) => {
        if (err) res.status(404).send(err.message);
      });

      await Interview.create({
        interviewerEmail: "ahmed@gmail.com",
        intervieweeEmail: "mohamed@gmail.com",
        day: "Monday",
        date: "11-09-2019",
        interviewslot: "2nd",
        startTime: "10:00",
        endTime: "10:30",
        interview: true
      });

      const response = await request(server).get("/api/interviews/");
      console.log(response);
      expect(response.body[0].intervieweeEmail).toEqual(
        "mohamed@gmail.com"
      );
      expect(response.status).toBe(200);
    }, 10000);
  });

  describe("put method for Interviews is working properly", () => {
    it("A booth member can book interviews", async () => {

        await HeadFreeSlot.deleteMany({}, (err, result) => {
            if (err) res.status(404).send(err.message);
          })
          
        await Interview.deleteMany({}, (err, result) => {
            if (err) res.status(404).send(err.message);
          })

          await HeadFreeSlot.create({
            headEmail: "dodo@gmail.com",
            day: "Monday",
            date: "11-09-2019",
            slot: "3rd"
          })

          await Interview.create({
            interviewerEmail: 'dodo@gmail.com'
            , intervieweeEmail: null
            , day: 'Monday'
            , date: '11-09-2019'
            , interviewslot: '3rd'
            , startTime: null
            , endTime: null
            , interview: false
        })

      const response = await request(server)
        .put("/api/interviews/edit")
        .send({
            interviewerEmail: "dodo@gmail.com"
            , day: "Monday"
            , date: "11-09-2019"
            , slot: "3rd"
            , intervieweeEmail: "lobna@gmail.com"
            , startTime: "12:00"
            , endTime: "12:30"
            , interview: true
        })

      const check = await Interview.findOne({
        intervieweeEmail: "lobna@gmail.com"
      });
      
      console.log(check);
      expect(response.status).toBe(200);
      expect(check.interview).toBe(true);
    });
})
});
