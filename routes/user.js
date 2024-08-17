
// import modules
const express = require("express");
const {handleUserSignin,  handleUserSignup} = require("../controllers/user");


// instantiate router
const router = express.Router();

// User signup and login 
router.get("/signin", (req, res) => res.status(200).render("user/user_signin"));
router.get("/signup", (req, res) => res.status(200).render("user/user_signup"));


// Doctor signup and login (post method)
router.post('/signup', handleUserSignup);
router.post('/signin', handleUserSignin);

module.exports = router;