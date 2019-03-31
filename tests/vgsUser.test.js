const request = require("supertest");
const mongoose = require("mongoose");
const VGS_User = require("../Models/VGS_User");

let server;

afterAll(async () => {
  await mongoose.connection.close();
});

describe("/api/VGS", () => {
  beforeEach(() => {
    server = require("../index");
  });

  afterEach(async () => {
    if (server) await server.close();
  });

  describe("As a Head I acn assign booth member", () => {
    it("To assign a booth member by his email, this person should not be a booth member already, a rejected person or not in the position of a member", async () => {
      await VGS_User.deleteOne({ email: "dodo@gmail.com" }, (err, result) => {
        if (err) res.status(404).send(err.message);
      });

      await VGS_User.create({
        email: "dodo@gmail.com",
        userType: "Member",
        clubCommittee: "HR",
        hobbies: "Playing Volleyball",
        VGSYear: "2016",
        appliedPosition: "HR Member",
        appStatus: "Accepted",
        notes: null,
        gameName: null,
        gameScrSho: null,
        downloadLink: null,
        boothMember: false
      });

      await VGS_User.create({
        email: "amany@hotmail.com",
        userType: "Member",
        clubCommittee: "GDD",
        hobbies: "Developing games",
        VGSYear: "2014",
        appliedPosition: "GDD Member",
        appStatus: "Accepted",
        notes: null,
        gameName: null,
        gameScrSho: null,
        downloadLink: null,
        boothMember: true
      });

      await VGS_User.create({
        email: "Jim@yahoo.com",
        userType: null,
        clubCommittee: null,
        hobbies: null,
        VGSYear: null,
        appliedPosition: null,
        appStatus: "Rejected",
        notes: null,
        gameName: null,
        gameScrSho: null,
        downloadLink: null,
        boothMember: false
      });

      await VGS_User.create({
        email: "ehab@hotmail.com",
        userType: "Advisor",
        clubCommittee: "GDD",
        hobbies: "Coding",
        VGSYear: "2012",
        appliedPosition: "GDD Advisor",
        appStatus: "Accepted",
        notes: null,
        gameName: null,
        gameScrSho: null,
        downloadLink: null,
        boothMember: false
      });

      //case 1 if he is already a booth member
      const boothMember = await request(server)
        .put("/api/VGS/assign/")
        .send({ email: "amany@hotmail.com" });

      //case 2 if he is rejected
      const rejected = await request(server)
        .put("/api/VGS/assign/")
        .send({ email: "Jim@yahoo.com" });

      //case 3 if he is not member
      const notMember = await request(server)
        .put("/api/VGS/assign/")
        .send({ email: "ehab@hotmail.com" });

      const response = await request(server)
        .put("/api/VGS/assign/")
        .send({ email: "dodo@gmail.com" });

      const find = await VGS_User.findOne({ email: "dodo@gmail.com" });

      expect(boothMember.status).toBe(404);
      expect(rejected.status).toBe(404);
      expect(notMember.status).toBe(404);
      expect(response.status).toBe(200);
      expect(find.boothMember).toBe(true);
    },10000);
  });
});
