const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//structure for a type of document.
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } //gives the timestamp when a doc was created or updated.
);

//created a model named workout which gives the all collections in the db for workout model
module.exports = mongoose.model("workout", workoutSchema);
