// imports
const { v4: uuidv4 } = require("uuid"); // for tracking user sessions
const fs = require("fs");
const multer = require("multer");

const { User } = require("../models/users");
const { Food } = require("../models/food");
const { setUser } = require("../services/auth");
const upload = require("../services/imageupload");

// handle user signup router
async function handleUserSignup(req, res){

    try{
        const {name, email, password} = req.body;

        // Add data to doctor model
        await User.create({
            name,
            email,
            password

        });

        return res.redirect("/user/signin"); 

    } catch(error) {
        res.status(400).send(error.message);
    }   
}

// handle user signin router
async function handleUserSignin(req, res) {
  try {
    const { email, password } = req.body;

    console.log(req.body);
    const user= await User.findOne({ email, password }); // find user from database

    console.log(user);

    // If no user is found
    if (!user)
      return res.render("user/user_signin", {
        signinError: "Invalid email or password",
      });

    // if user is found make a session cookies
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("userid", sessionId);

    res.redirect("/");
  } catch (error) {
    res.status(400).send(error.message);
  }
}



// exports
module.exports = {
    handleUserSignin,
    handleUserSignup

};
