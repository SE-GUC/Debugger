const request = require("supertest");
const mongoose = require("mongoose");
const Group = require("../Models/Group");

let server;

afterAll(async () => {
  await mongoose.connection.close();
});

describe("/api/groups", () => {
  beforeEach(() => {
    server = require("../index");
  });

  afterEach(async () => {
    if (server) await server.close();
  });

  describe("post method for Group is working properly", () => {
    it("creating a new Group", async () => {

      await Group.deleteOne({ name: "Amarena" });
      const response = await request(server)
        .post("/api/groups/")
        .send({
          name: "Amarena",
          createdBy: "shady@gmail.com",
          members: ["fathy@gmail.com"]
        });

      const check = await Group.findOne({
        name: "Amarena"
      });

      console.log(check);
      expect(response.status).toBe(200);
      expect(check.name).toBe("Amarena");
    }, 10000);
  });

  describe("put method for Groups is working properly", () => {
    it("Adding members to a group", async () => {

      const response = await request(server)
        .put("/api/groups")
        .send({
         name: "Amarena",
         members: ['fatma@gmail.com', 'hany@gmail.com']
        });

      const check = await Group.findOne({
        name: "Amarena"
      });

      console.log(check);
      expect(response.status).toBe(200);
      expect(check.members).toContain("fatma@gmail.com");
    });
  });
});