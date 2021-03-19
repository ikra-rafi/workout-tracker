const mongoose = require("mongoose");
// new instance of mongoose schema obj
const Schema = mongoose.Schema;
// creating workout schema
const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: () => new Date()
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
        },
        name: {
          type: String,
          trim: true,
        },
        duration: {
          type: Number,
        },
        weight: {
          type: Number
        },
        reps: {
          type: Number
        },
        sets: {
          type: Number
        },
        distance: {
          type: Number
        }
      }
    ]
  },
  {
    toJSON: {
      // options to save the virtuals
      virtuals: true
    }
  }
);

// addition of a virtual property. this is not stored in the database but holds total exercises duration and adds property to schema dynamically
workoutSchema.virtual("totalDuration").get(function () {
  // "reduce" array of exercises down to just the sum of their durations
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});
// method to create the workouts collection in the database using the schema to org data
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;