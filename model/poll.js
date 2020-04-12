const mongoose = require("mongoose");

const Poll = new mongoose.Schema({
  Question: {
    type: String,
  },
  Answer: {
    type: String,
  },
  yes_number: {
    type: Number,
  },
  no_number: {
    type: Number,
  },
});

const UserPoll = mongoose.model("Poll", Poll);
module.exports = UserPoll;
