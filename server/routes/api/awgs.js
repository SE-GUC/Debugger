const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const AWG = require("../../Models/AWG");
const Message = require("../../Models/Message");
const validator = require('../../Validations/messageValidations');

router.get("/contactUs", async (req, res) => res.json({ data: await Message.find() }));

// Send contact us Message
router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const newMessage = await Message.create(req.body);
    res.json({ msg: "Message sent successfully", data: newMessage });
  } catch (error) {
    console.log(error);
  }
});

/* Get about us page for logged in/ not logged in user  */
router.get("/", function(req, res, next) {
  AWG.find(function(err, aboutUs) {
    if (err) return next(err);
    res.json(aboutUs);
  });
});

module.exports = router;
