
// import modules
const express = require("express");
const {handleAdminSignin, adminDashboard, createNewItem, uploadItemImage, getListedItems} = require("../controllers/admin");
const {restrictToLoggedinAdminOnly} = require("../middlewares/auth"); // middleware to restrict dashboard
const { render } = require("ejs");

// instantiate router
const router = express.Router();

// Define routing for admin
router.get("/", async (req, res) => {    
    if(!req.user) return res.redirect("/admin/signin");                        // if no admin inside session cookies
    
    // if user is a doctor or patient
    if(req.user) return res.status(200).redirect("/admin/dashboard");                         
});

// Admin signin 
router.get("/signin", (req, res) => res.status(200).render("admin/admin_signin"));



// Admin (post method)
router.post('/signin', handleAdminSignin);


// Doctor dashboard
// router.get("/dashboard", adminDashboard);
router.get("/dashboard", restrictToLoggedinAdminOnly,  adminDashboard);


// New Item 
router.post('/item', createNewItem);
// .get(restrictToLoggedinAdminOnly, getListedItems)
// .get(getDoctorService)


// upload food image
router.post('/uploadItemImage/:id', uploadItemImage);

// listed items
router.get('/listedItems/:id', restrictToLoggedinAdminOnly, getListedItems);



module.exports = router;