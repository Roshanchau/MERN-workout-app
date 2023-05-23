const jwt = require("jsonwebtoken");
const  userModel=require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //verify authentication
  // we are checking if the user is authorized or not by
  // checking its token is authorized to the server or not.

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  //we want the 2nd part of the authorization after we split with an space
  //   -> so we used the 1 indexed array.
  const token = authorization.split(" ")[1];

  try {
    // we are trying to verify the token with the secret int env with the jwt sent fromt he server.
    const {_id}=jwt.verify(token, process.env.SECRET);
    
    //we are getting the user if the token is verified and get the id which scans the user 
    // - with that respective id only and get the user id only by using select.
    req.user=await userModel.findOne({_id}).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports=requireAuth;