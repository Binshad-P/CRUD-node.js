const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
     // Ensures emails are unique
  },
  description: {
    type: String,
    required: true,
  },
 
});


const product = mongoose.model("product", productSchema);

// Export the User model
module.exports = product;
