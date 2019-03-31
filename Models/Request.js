const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create the schema
/*class Request {

    constructor () {


 
        this.sender_email = sender_email;
    
    
    
        this.reciever_email = reciever_email;
    
    
    
        this.Status = Status; 
    
    
    
        this.request_msg = request_msg ;
    
    
    
    }

}*/

const RequestSchema = new Schema({
  sender_email: {
    type: String,
    required: true
  },

  reciever_email: {
    type: String,
    required: true
  },

  Status: {
    type: Boolean
  },

  request_msg: {
    type: String
  }
});

module.exports = Request = mongoose.model("requests", RequestSchema);
