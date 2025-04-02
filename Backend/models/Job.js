const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  description: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
  resume: { type: String }, // File path for resume upload
});

module.exports = mongoose.model("Job", JobSchema);
