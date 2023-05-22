import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

//everytime we need to get the workouts data we can invoke the useWorkoutsContext hook 
export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside an WorkoutsContextprovider"
    );
  }

  return context;
};
 