const mongoose = require('mongoose');

// here we are getting access to Schema class from mongoose
const Schema = mongoose.Schema;

// Schema defines the STRUCTURE of documents in the collection
// this is the BLUEPRINT for all instances
const taskSchema = new Schema({
  
});

module.exports = mongoose.model("Task", taskSchema);
