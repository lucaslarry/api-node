let mongoose = require("mongoose");

let taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  finished: Boolean,
});

module.exports = mongoose.model("Task", taskSchema);
