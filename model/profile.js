let mongoose = require("mongoose");

let profileSchema = new mongoose.Schema({
  occupation: String,
  phone: String,
  address: String,
  person: { type: mongoose.Schema.Types.ObjectId, ref: "Person" }, 
});

module.exports = mongoose.model("Profile", profileSchema);



