const express = require("express");
const router = express.Router();
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth=require("../middleware/requireAuth");

//middleware route
//so before using any other routes the middleware is invoked
// - and it checks whether the user is authenticated or not
// - if the user is not authenticated then we cannot show any 
// -of the workouts or get to handle the workouts like delete it create it or others.
//this middle protects the other routes from unauthorized users.
router.use(requireAuth);


//get all workouts  
router.get("/", getWorkouts);

//get single workout
router.get("/:id", getWorkout);

//post a new workout
router.post("/", createWorkout);

//delete a workout
router.delete("/:id", deleteWorkout);

//update a workout
router.patch("/:id", updateWorkout);

module.exports = router;
