const mongoose = require('mongoose');

var task_schema = mongoose.Schema({
  name: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: Number, required: true },
});

const task = mongoose.model('Task', task_schema);

module.exports = task;