import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

//everytime we need to get the workouts data we can invoke the useWorkoutsContext hook 
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error(
      "useAuthContext must be used inside an WorkoutsContextprovider"
    );
  }

  return context;
};
