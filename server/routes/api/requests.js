const express = require("express");

const router = express.Router();

const Request = require("../../Models/Request");

const validator = require("../../Validations/RequestValidations");

router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    req.body.Status = false ;
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

router.put("/edit_requests/: RequestID", async (req, res) => {
  try {
    let selectreq = await Request.findById(req.params. RequestID);
    await Request.update(
      { _id: req.params. RequestID},
      {
        
        Status: req.body.Status || selectreq.Status,
       
      }
    );
    return res.send("request updated");
  } catch (err) {
    res.status(400).send("cannot edit request  , id not found");
  }
});
router.get("/viewstatus/:sender_email", async (req, res) => {
  try {
    const Requ = await Request.findOne({ sender_email:req.params.sender_email });
    //res.json({data: requests})
    
    

    return res.json({ data: Requ });
  } 
  catch {
    res.status(400).send("email not found");
  }
});

router.get("/viewrequest/:reciever_email", async (req, res) => {
  try {
    const urReq = await Request.findOne({ reciever_email:req.params.reciever_email });
    //res.json({data: requests})
    
    let RequestID = {
      
      RequestID: urReq._id
    
      
  }
  
    return res.json({ data: urReq , RequestID});
  } catch {
    res.status(400).send("email not found");
  }
});

module.exports = router;
