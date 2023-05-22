import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

//we created our custom workouts context provider component which returns the actual provider of the context we created.

//state arguement below is the previous state value before we make a change to it and the action arguement is the object which we pass to the dispatch function.  action simply means we want to either set , add , delete the workouts
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        //here action .payload in the action.type="SET_WORKOUTS" will get the whole json response thus the workout property will go from null to this json response
        workouts: action.payload,
      };
    case "CREATE_WORKOUTS":
      return {
        //while crating a new workout we are putting the new one's before the old ones which is the older state.workouts
        workouts: [action.payload, ...state.workouts],
      };

    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  //useReducer and useState hooks are similar the differece is to set the state dispatch function is invoked and which invokes the reducer function and sets the state.
  const [state, dispatch] = useReducer(workoutsReducer,{
    workouts: null,
  });   //workoutsReducer is a function  which sets the workouts state which is null initally.

  //   the disptach function has an object as an arguement where the type is set which show what the state change we want to make and the second payload property represents any data we need to make the change.
  //   dispatch({type:"SET_WORKOUTS" , payload:[{} , {}]}) //when we call the dispatch function the workuotsReducer function is invoked.

  //children over here is the root app component
  return (
    //we are sending the value as state use the current state and dispatch to update the state by all the components of the application.

    //using the ... operator in the state we are trying to use the different property of the workout just like state.workouts
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );}
   //this is the provider that needs to  wraps whatever components we need to acess the context it represent


