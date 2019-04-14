require("dotenv").config();
const mongoose = require("mongoose");

//mongoose.connect(process.env.MONGO_URI, { dbName: "test" });
let newuser;
let server;
const request = require("supertest");
const VGS_User = require("../Models/VGS_User");
//const vgs_users = require("./routes/api/vgsUsers");


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
  
  beforeAll(async ()=>{
      await VGS_User.deleteMany({}, (err, result) => {
          if (err) expect(err).toBeTruthy() })
  }) 
  // Async problem
  describe("As a Head I acn assign booth member", () => {
    it("To assign a booth member, this person should not be a booth member already, a rejected person or not in the position of a member", async (done) => {
    //   await VGS_User.deleteOne({ email: "dodo@gmail.com" }, (err, result) => {
    //     if (err) res.status(404).send(err.message);
    //   });

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
    },10000)
  })
})


describe("/api/VGS/showusers", () => {
  beforeEach(() => {
    server = require("../index");
  });
  afterEach(async() => {
    await server.close();
  });

  test("there is a sherry mail", async () => {
    newuser = new VGS_User({
      email: "shosho@yahoo.com",
      userType: "member",
      clubCommittee: "dawar",
      hobbies: "running",
      VGSYear: 153,
      appliedPosition: "head",
      notes: "write",
      gameName: "pew pew",
      gameScrSho: "zeew",
      downloadLink: "facebookk:dksdmn",
      boothMember: false
    });
    await newuser.save();
    const res = await request(server).get("/api/VGS/showusers");
    expect(res.text).toMatch("shosho@yahoo.com");
  });

  //addnote
  test("addnote", async () => {
    await request(server)
      .put("/api/VGS/note")
      .send({ email: "shosho@yahoo.com", notes: "" })
      .then(res => {
        expect(res.text).toMatch("note field is required");
      });
  });
  test("addnote2", async () => {
    await request(server)
      .put("/api/VGS/note")
      .send({ email: "", notes: "abcdef" })
      .then(res => {
        expect(res.text).toMatch("email field is required");
      });
  });
  test("addnote3", async () => {
    await request(server)
      .put("/api/VGS/note")
      .send({ email: "shosho@yahoo.com", notes: 12345 })
      .then(res => {
        expect(res.text).toMatch("Invalid value for note");
      });
  });
  test("addnote4", async () => {
    await request(server)
      .put("/api/VGS/note")
      .send({ email: "shosho@yahoo.com", notes: "hard worker" })
      .then(res => {
        expect(res.text).toMatch("shosho@yahoo.com");
        expect(res.text).toMatch("hard worker");
      });
  });
  //prisedent can edit user
  test("edituser", async () => {
    await request(server)
      .put("/api/VGS/edituser")
      .send({ email: "" })
      .then(res => {
        expect(res.text).toMatch("email field is required");
      });
  });
  test("edituser2", async () => {
    await request(server)
      .put("/api/VGS/edituser")
      .send({ email:"wrongemail" })
      .then(res => {
        expect(res.text).toMatch("invalid email");
      });
  });
  test("edituser3", async () => {
    newuser = new VGS_User({
      email: "zola@yahoo.com",
      userType: "member",
      clubCommittee: "dawar",
      hobbies: "running",
      VGSYear: 153,
      appliedPosition: "head",
      notes: "good",
      gameName: "pew pew",
      gameScrSho: "zeew",
      downloadLink: "facebookk:dksdmn",
      boothMember: false
    });
    await newuser.save();
    res = await request(server)
      .put("/api/VGS/edituser")
      .send({ email: "zola@yahoo.com", VGSYear: 2019 })
      .then(res => {
        expect(res.text).toMatch(/zola@yahoo.com/);
        expect(res.text).toMatch(/2019/);
      });
  });
  test("edituser3", async () => {
    newuser = new VGS_User({
      email: "ahmedhosam@yahoo.com",
      userType: "president",
      clubCommittee: "all",
      hobbies: "running",
      VGSYear: 153,
      appliedPosition: "null",
      notes: "good",
      gameName: "pew pew",
      gameScrSho: "zeew",
      downloadLink: "facebookk:dksdmn",
      boothMember: false
    });
    await newuser.save();
    await request(server)
      .put("/api/VGS/edituser")
      .send({ email: "ahmedhosam@yahoo.com" })
      .then(res => {
        expect(res.text).toMatch("you can not edit a president account");
      });
  });

  //prisedent delete account
  test("deleteuser", async () => {
    await request(server)
      .delete("/api/VGS/deleteuser")
      .send({ email: "" })
      .then(res => {
        expect(res.text).toMatch("email field is required");
      });
  });

  test("deleteuser2", async () => {
    await request(server)
      .delete("/api/VGS/deleteuser")
      .send({ email: "wrongemail" })
      .then(res => {
        expect(res.text).toMatch(/invalid email/);
      });
  });
  test("deleteuser3", async () => {
    await request(server)
      .delete("/api/VGS/deleteuser")
      .send({ email: "ahmedhosam@yahoo.com" })
      .then(res => {
        expect(res.text).toMatch("you can not delete a president");
      });
  });
  it("deleteuser4", async () => {
    newuser = new VGS_User({
      email: "deletefromvgs@yahoo.com",
      userType: "member",
      clubCommittee: "dawar",
      hobbies: "running",
      VGSYear: 153,
      appliedPosition: "head",
      notes: "write",
      gameName: "ta5 ta5",
      gameScrSho: "zeew",
      downloadLink: "facebookk:dksdmn",
      boothMember: false
    });
    await newuser.save();
    await request(server)
      .delete("/api/VGS/deleteuser")
      .send({ email: "deletefromvgs@yahoo.com" })
      .then(res => {
        expect(res.text).toMatch("user deleted");
      });
  });

  //head can add member
  test("addmemberincommity", async () => {
    await request(server)
      .put("/api/VGS/addmemberincommity")
      .send({ email: "zola@yahoo.com", clubCommittee: "" })
      .then(res => {
        expect(res.text).toMatch("club committee field is required");
      });
  });
  test("addmemberincommity2", async () => {
    await request(server)
      .put("/api/VGS/addmemberincommity")
      .send({ email: "", clubCommittee: "dwar" })
      .then(res => {
        expect(res.text).toMatch("email field is required");
      });
  });
  test("addmemberincommity3", async () => {
    await request(server)
      .put("/api/VGS/addmemberincommity")
      .send({ email: "zola@yahoo.com", clubCommittee: 12345 })
      .then(res => {
        expect(res.text).toMatch("Invalid value for clubCommittee");
      });
  });
  test("addmemberincommity4", async () => {
    await request(server)
      .put("/api/VGS/addmemberincommity")
      .send({ email: "wrongemail", clubCommittee: "dwar" })
      .then(res => {
        expect(res.text).toMatch("invalied user");
      });
  });
  test("addmemberincommity5", async () => {
    await request(server)
      .put("/api/VGS/addmemberincommity")
      .send({ email: "ahmedhosam@yahoo.com", clubCommittee: "dwar" })
      .then(res => {
        expect(res.text).toMatch("you can not add a president");
      });
  });
  test("addmemberincommity5", async () => {
    newuser = new VGS_User({
      email: "advisor@yahoo.com",
      userType: "advisor",
      clubCommittee: "all",
      hobbies: "running",
      VGSYear: 153,
      appliedPosition: "null",
      notes: "good",
      gameName: "pew pew",
      gameScrSho: "zeew",
      downloadLink: "facebookk:dksdmn",
      boothMember: false
    });
    await newuser.save();
    await request(server)
      .put("/api/VGS/addmemberincommity")
      .send({ email: "advisor@yahoo.com", clubCommittee: "dwar" })
      .then(res => {
        expect(res.text).toMatch("you can not add an advisor");
      });
  });
  test("addmemberincommity6", async () => {
    newuser = new VGS_User({
      email: "head@yahoo.com",
      userType: "head",
      clubCommittee: "all",
      hobbies: "running",
      VGSYear: 153,
      appliedPosition: "null",
      notes: "good",
      gameName: "pew pew",
      gameScrSho: "zeew",
      downloadLink: "facebookk:dksdmn",
      boothMember: false
    });
    await newuser.save();
    await request(server)
      .put("/api/VGS/addmemberincommity")
      .send({ email: "head@yahoo.com", clubCommittee: "dwar" })
      .then(res => {
        expect(res.text).toMatch("you can not add a head");
      });
  });
  test("addmemberincommity7", async () => {
    await request(server)
      .put("/api/VGS/addmemberincommity")
      .send({ email: "zola@yahoo.com", clubCommittee: "dwar" })
      .then(res => {
        expect(res.text).toMatch("you can not add a member");
      });
  });
  // test("addmemberincommity8", async () => {
  //   newuser = new VGS_User({
  //     email: "applicant@yahoo.com",
  //     userType: "applicant",
  //     clubCommittee: "null",
  //     hobbies: "running",
  //     VGSYear: 153,
  //     appliedPosition: "member",
  //     notes: "good",
  //     gameName: "pew pew",
  //     gameScrSho: "zeew",
  //     downloadLink: "facebookk:dksdmn",
  //     boothMember: false
  //   });
  //   await newuser.save();
  //   await request(server)
  //     .put("/api/VGS/addmemberincommity")
  //     .send({ email: "applicant@yahoo.com", clubCommittee: "dwar" })
  //     .then(res => {
  //       expect(res.text).toMatch("applicant@yahoo.com");
  //       expect(res.text).toMatch("dwar");
  //     });
  // });
  //head delete user under him
  test("deletefromcommity", async () => {
    newuser = new VGS_User({
      email: "applicant2@yahoo.com",
      userType: "applicant",
      clubCommittee: "null",
      hobbies: "running",
      VGSYear: 153,
      appliedPosition: "member",
      notes: "good",
      gameName: "pew pew",
      gameScrSho: "zeew",
      downloadLink: "facebookk:dksdmn",
      boothMember: false
    });
    await newuser.save();
    await request(server)
      .delete("/api/VGS/deletefromcommity")
      .send({ email: "applicant2@yahoo.com" })
      .then(res => {
        expect(res.text).toMatch("you can not delete a applicant");
      });
  });
  test("deletefromcommity2", async () => {
    await request(server)
      .delete("/api/VGS/deletefromcommity")
      .send({ email: "head@yahoo.com" })
      .then(res => {
        expect(res.text).toMatch("you can not delete a head");
      });
  });
  test("deletefromcommity2", async () => {
    await request(server)
      .delete("/api/VGS/deletefromcommity")
      .send({ email: "advisor@yahoo.com" })
      .then(res => {
        expect(res.text).toMatch("you can not delete an advisor");
      });
  });
  test("deletefromcommity3", async () => {
    newuser = new VGS_User({
      email: "deletefromcomity@yahoo.com",
      userType: "member",
      clubCommittee: "dawar",
      hobbies: "running",
      VGSYear: 153,
      appliedPosition: "head",
      notes: "good",
      gameName: "pew pew",
      gameScrSho: "zeew",
      downloadLink: "facebookk:dksdmn",
      boothMember: false
    });
    await newuser.save();
    await request(server)
      .delete("/api/VGS/deletefromcommity")
      .send({ email: "deletefromcomity@yahoo.com" })
      .then(res => {
        expect(res.text).toMatch('"deletefromcomity@yahoo.com"');
        expect(res.text).toMatch("null");
      });
  });
  test("deletefromcommity2", async () => {
    await request(server)
      .delete("/api/VGS/deletefromcommity")
      .send({ email: "" })
      .then(res => {
        expect(res.text).toMatch("email field is required");
      });
  });
  test("deletefromcommity2", async () => {
    await request(server)
      .delete("/api/VGS/deletefromcommity")
      .send({ email: "wrongemail" })
      .then(res => {
        expect(res.text).toMatch("invalid email");
      });
  });
});

