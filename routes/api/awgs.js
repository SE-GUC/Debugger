const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");



const AWG = require("../../Models/AWG");
const Message = require("../../Models/Message");


// const awgs = [
//   new AWG(
//     (clubDescription =
//       "Determined to fulfill a dream, a dream of being the change"),
//     (clubName = "MUN")
//   ),
//   new AWG(
//     (clubDescription =
//       "Vector Game Studio is an AWG aimimg to develop and sustain a game development community in Egypt.We do this by giving game art design (GAD) and game designand development (GDD) sessions to our recruits. We also host VGS exclusive events and public events such as game jams and meetups to help create a platform where people with a passion for game development can meet, work together, and exchange ideas."),
//     (clubName = "VGS")
//   ),
//   new AWG(
//     (clubDescription =
//       "First Worlds style debate club in Egypt and North Africa. Established and located in the German University in Cairo"),
//     (clubName = "TIQ")
//   ),
//   new AWG(
//     (clubDescription =
//       "Nebny GUC is a branch of Nebny Foundation, a non-profitable/non-governmental organization.We are a new AWG in the GUC"),
//     (clubName = "Nebny")
//   )
// ];

// const messages = [
//   new Message("Hossam", "hossam@hossam.hoss", "Test Hossam Message", "VGS")
// ];

router.get("/", async (req, res) => res.json({ data: await AWG.find() }));


// router.post('/', async (req,res) => {
//   try {
//    const isValidated = validator.createValidation(req.body)
//    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
//    const newBook = await Book.create(req.body)
//    res.json({msg:'Book was created successfully', data: newBook})
//   }
//   catch(error) {
//       // We will be handling the error later
//       console.log(error)
//   }  
// })


// Send contact us Message
router.post("/", async (req, res) => {
  try{
       const isValidated = validator.createValidation(req.body)
       if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
       const newMessage = await Message.create(req.body)
       res.json({msg: "Message sent successfully", data: newMessage})
  }
  catch(error) {
    //       // We will be handling the error later
        console.log(error)
  }
});  

  // const name = req.body.name;
  // const email = req.body.email;
  // const message = req.body.message;
  // const clubName = req.body.clubName;

  // if (!name) return res.status(400).send({ err: "Name field is required" });
  // if (typeof name !== "string")
  //   return res.status(400).send({ err: "Invalid value for Name" });

  // if (!email) return res.status(400).send({ err: "email field is required" });
  // if (typeof email !== "string")
  //   return res.status(400).send({ err: "Invalid value for email" });

  // if (!message)
  //   return res.status(400).send({ err: "message field is required" });
  // if (typeof message !== "string")
  //   return res.status(400).send({ err: "Invalid value for message" });

  // const newMessage = {
  //   name,
  //   email,
  //   message,
  //   clubName
  // };
  // messages.push(newMessage);
  // res.send(newMessage);

  //   return res.json({ data: newMessage });
// });
/*
router.get("/:clubname", (req, res) => {
  const filteredClubName = req.params.clubname;
  const filteredMessages = eventforms.filter(
    filteredMessages => filteredMessages.clubName === filteredClubName
  );
  res.send(filteredMessages);

const awgs = [
  new AWG(
    (clubDescription =
      "Determined to fulfill a dream, a dream of being the change"),
    (clubName = "MUN")
  ),
  new AWG(
    (clubDescription =
      "Vector Game Studio is an AWG aimimg to develop and sustain a game development community in Egypt.We do this by giving game art design (GAD) and game designand development (GDD) sessions to our recruits. We also host VGS exclusive events and public events such as game jams and meetups to help create a platform where people with a passion for game development can meet, work together, and exchange ideas."),
    (clubName = "VGS")
  ),
  new AWG(
    (clubDescription =
      "First Worlds style debate club in Egypt and North Africa. Established and located in the German University in Cairo"),
    (clubName = "TIQ")
  ),
  new AWG(
    (clubDescription =
      "Nebny GUC is a branch of Nebny Foundation, a non-profitable/non-governmental organization.We are a new AWG in the GUC"),
    (clubName = "Nebny")
  )
];

const messages = [
  new Message("Hossam", "hossam@hossam.hoss", "Test Hossam Message")
];

router.get("/", (req, res) => res.json({ awgs }));

// Send Message
router.post("/", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  if (!name)
    return res.status(400).send({ err: "Name field is required" });
  if (typeof name !== "string")
    return res.status(400).send({ err: "Invalid value for Name" });

  if (!email) 
    return res.status(400).send({ err: "email field is required" });
  if (typeof email !== "string")
    return res.status(400).send({ err: "Invalid value for email" });

  if (!message)
    return res.status(400).send({ err: "message field is required" });
  if (typeof message !== "string")
    return res.status(400).send({ err: "Invalid value for message" });

  const newMessage = {
    name,
    email,
    message
  };
  messages.push(newMessage);
  res.send(newMessage);

  //   return res.json({ data: newMessage });
<<<<<<< HEAD

});*/
=======
});
/* Get about us page for logged in/ not logged in user  */
router.get('/', function(req, res, next) {
  AWG.find(function (err, aboutUs) {
    if (err) return next(err);
    res.json(aboutUs);
  });
});
>>>>>>> AWG

module.exports = router;
