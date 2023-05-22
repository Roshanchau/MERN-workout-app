require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// express app
const app = express(); 

//middleware
// By including this line of code in your Express application, you're telling Express to automatically parse JSON request bodies and make the data available as a JavaScript object in the req.body property of the incoming request. This makes it easy to access and work with the data sent in a JSON format.
app.use(express.json()); //we use it for req.body

//middleware bhaneko req ra res bich ma run hune function it can be a messgae or we can log a path and a method.
app.use((req, res, next) => {
  console.log(req.path, req.method); //this is middleware
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db &listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
