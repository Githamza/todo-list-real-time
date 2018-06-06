var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    task: String
});

module.exports = mongoose.model("tasks", taskSchema);