const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method

//this is a static singup method we can call during a signup
//which is available in the userSchema model

//so this static function is called whenever we try to signup whcich checks whether an email already exists or not and throws an error if does and help to hash the password by using the bcrypt and also using salt which is basically adding additional numbers or characters to your password foreg: whoareyou32423942398432

//the arrow funciton doesnot work with this keyword
userSchema.statics.signup = async function (email, password) {
  //validation

  //if there is no email or no password then it throws an error which is catched by the signupUser function in the controllers.
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  //similarly if the email is not vaild then the condition becomes true and the it throws a message that email is not valid.
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  //isStrongPassword checks whether if the password is strong or not.
  if (!validator.isStrongPassword(password)) {
    throw Error("password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //creates a user model with email and hashed password
  const user = await this.create({ email, password: hash });
  return user;
};

//static login method.
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  //when the post request for the login is fired then the userController uses the user model to get a user from the static login method if we get the email entered and if there is no such email it will throw an error and then we compare the password using the bycrypt and if it matches then we return the user.
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
