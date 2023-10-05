const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures emails are unique
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  dob:{
    type:String,
   
  }
});


const Admin = mongoose.model("Admin",adminSchema);

// Export the User model
module.exports = Admin;