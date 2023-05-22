import React from "react";
import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
const Home = () => {
  //instead of using a local state we are using a  global context.
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json(); // we parse the workout response and get an array of workout objects.
      if (response.ok) {
        //after getting the response we fire the dispatch function which invokes the workoutsReducer function in the workoutContext.js and passes the passes in the action which is the (type:"same as below" , payload:is the json which is the whole response while fetching the data. )
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    fetchWorkouts();
  }, [dispatch]); //we use an empty array so that the effect hook works only one time

  return (
    <>
      <div className="home">
        <div className="workouts">
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))} 
        </div>
        <WorkoutForm />
      </div>
    </>
  );
};

export default Home;
