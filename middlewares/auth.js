// imports
const { getUser } = require("../services/auth");

// funciton to make admin dashboard available for signin Admin
async function restrictToLoggedinAdminOnly(req, res, next){

    console.log("restrict middleware");
    console.log(req.cookies);
    const adminUid = req.cookies?.uid;                       // get cookies uid    
    if(!adminUid) return res.redirect("/admin/signin");                  // if admin has no adminId

    // get user
    const admin = getUser(adminUid);
    console.log(admin);
    // if admin has no adminId
    if(!admin) return res.redirect("/admin/signin");

    // if everything is ok
    req.user = admin;
    next();
}

/*
// funciton to make dashboard available for logged in users only
async function restrictToLoggedinUserOnly(req, res, next){

    
    const userUid = req.cookies?.uid;                       // get cookies uid    
    if(!userUid) return res.redirect("/admin/signin");                  // if user has no userId

    // get user
    const user = getUser(userUid);

    // if user has no userId
    if(!user) return res.redirect("/");

    // if everything is ok
    req.user = user;
    next();
}
*/
// Function to check a user is logged in or not for a particular session
async function checkAuth(req, res, next){

    const userUid = req.cookies?.uid;                       // get cookies uid                          
    const user = getUser(userUid);                          // get user

    // if everything is ok
    req.user = user;
    next();
}



module.exports = { checkAuth, restrictToLoggedinAdminOnly };