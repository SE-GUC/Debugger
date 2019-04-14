const express = require("express");

const router = express.Router();

const Request = require("../../Models/Request");

const validator = require("../../Validations/RequestValidations");

router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);

    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });

    const newRequest = await Request.create(req.body);

    res.json({ msg: "Request was created successfully", data: newRequest });
  } catch (error) {
    res.send(`error, we couldn't create request`);
  }
});

router.get("/", async (req, res) => {
  const requests = await Request.find();
  res.json({ data: requests });
});

/*router.put('/:requestid', async (req,res) => {
    try {
     const requestid = req.params.requestid
     const Request = await Request.findOne({requestid})
     if(!Request) return res.status(404).send({error: 'Request does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedRequest = await Request.updateOne(req.body)
     res.json({msg: 'Request updated successfully'})
    }
    catch(error) {
        
        console.log(error)
    }  
 })*/

router.put("/edit_requests/:id", async (req, res) => {
  try {
    let selectreq = await Request.findById(req.params.id);
    await Request.update(
      { _id: req.params.id },
      {
        sender_email: req.body.sender_email || selectreq.sender_email,
        reciever_email: req.body.reciever_email || selectreq.reciever_email,
        Status: req.body.Status || selectreq.Status,
        request_msg: req.body.request_msg || selectreq.request_msg
      }
    );
    return res.send("request updated");
  } catch (err) {
    res.status(400).send("cannot edit request  , id not found");
  }
});
router.get("/:id", async (req, res) => {
  try {
    const urReq = await Request.find({ _id: req.params.id });
    //res.json({data: requests})
    if (urReq[0].Status == true) {
      return res.send("your request is accepted");
    } else if (urReq[0].Status == false) {
      return res.send("your request is rejected");
    }

    return res.json({ data: urReq });
  } catch {
    res.status(400).send("id not found");
  }
});

module.exports = router;
