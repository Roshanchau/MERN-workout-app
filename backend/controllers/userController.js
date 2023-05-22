const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//here we have created a function which signs a jwt token using the respective id of the user using the env from which we use the secret to hash and which will expire in 3 days.
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //here the login method returns a user with hashed password and email which we have matched using the userSchema.statics method
    const user = await User.login(email, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //here the signup method returns a user with hashed password and email which we have created using the userSchema.statics method
    const user = await User.signup(email, password);

    //create a token
    //user sends a signup request and if the server is happy with the credentials then it will create  a jwt for the user and it will
    //---> send back to the client. if have the jwt then we will let the user to see the home page and if we are logged out or
    //---> unauthenticated then we will not let the user see the home page using the jwt and redirect them to the login page.
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
