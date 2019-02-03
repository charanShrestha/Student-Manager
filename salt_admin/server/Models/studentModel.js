const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  vitalInfo: {
    personNumber: String,
    firstName: String,
    lastName: String,
    phone: Number,
    email: String,
    address: String,
    image: String
  },
  performance: Array,
  comments: Array,
  status: {type: String, enum: ['active', 'archived']}
});

module.exports = mongoose.model('student', StudentSchema);
