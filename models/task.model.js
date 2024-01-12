const mongoose = require('mongoose');

// here we are getting access to Schema class from mongoose
const Schema = mongoose.Schema;

// Schema defines the STRUCTURE of documents in the collection
// this is the BLUEPRINT for all instances
const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    dueDate: Date,
    status: {
        type: String,
        required: true,
        default: "PENDING",
        enum: ["COMPLETED", "IN PROGRESS", "PENDING", "POSTPONED", "DELETED"]
    },
    deletedAt: Date,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
