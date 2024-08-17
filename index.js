// import modules
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

// import custom modules
const { connectToMongoDB } = require("./connect");

// import custom middlewares
const { checkAuth } = require("./middlewares/auth");

// import routes
const staticRoute = require("./routes/staticRouter");
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");

// express app
const app = express();
// Enable CORS for all origins
app.use(cors());
const PORT = 3000;
// const mongoUri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/FoodDelivery';
const mongoUri = 'mongodb+srv://amareshmaity2002:X37tl4hLW7O8T86T@cluster0.g2ktfbf.mongodb.net/FoodDelivery?retryWrites=true&w=majority&appName=Cluster0';
// connect to database
connectToMongoDB(mongoUri)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => {
    console.log("MongoDB connection error: ", err.message);
  });

// To tell express that we use EJS template engine (for SSR)
app.set("view engine", "ejs"); // Set EJS template engine
app.set("views", path.resolve("./views")); // tell express where is your views (.ejs files)

// add middlewares
app.use(express.json()); // add middleware - to parse url (json data)
app.use(express.urlencoded({ extended: false })); // middleware to handle form data
app.use(cookieParser()); // middleware to extract(parse) data from cookie
app.use(express.static(path.join(__dirname, "public")));

// http request for routes
// app.use("/", checkAuth, staticRoute);
app.use("/", staticRoute);
app.use("/user", checkAuth, userRoute);
//app.use("/user");

// For admin
app.use("/admin", checkAuth, adminRoute);

/*
// Route to handle sign out and delete cookies
app.get('/signout', (req, res) => {
    res.clearCookie('uid'); // Delete specific cookie
    res.clearCookie('sessionId'); // Delete specific cookie
    // You can clear other cookies here
    res.redirect('/'); // Redirect to login page
});
*/

// listen : start the server
app.listen(PORT, () => console.log("Server started at port ", PORT));




module.exports = app;