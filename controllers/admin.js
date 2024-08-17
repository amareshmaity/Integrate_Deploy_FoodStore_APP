// imports
const { v4: uuidv4 } = require("uuid"); // for tracking user sessions
const fs = require("fs");
const multer = require("multer");

const { Admin } = require("../models/admin");
const { Food } = require("../models/food");
const { setUser } = require("../services/auth");
const upload = require("../services/imageupload");

// handle admin signin router
async function handleAdminSignin(req, res) {
  try {
    const { email, password } = req.body;

    console.log(req.body);
    const admin = await Admin.findOne({ email, password }); // find user from database

    console.log(admin);

    // If no admin is found
    if (!admin)
      return res.render("admin/admin_signin", {
        signinError: "Invalid email or password",
      });

    // if admin is found make a session cookies
    const sessionId = uuidv4();
    setUser(sessionId, admin);
    res.cookie("uid", sessionId);

    res.redirect("/admin/dashboard");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Admin dahsboard router
async function adminDashboard(req, res) {
  try {
    const adminId = req.user?._id; // Assuming you have user ID available in req.user
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(400).send("User not found");
    }
    // const profileImageAddress = doctor.profileImage.filename;
    res.render("admin/admin_dashboard", {
      // file: profileImageAddress,
      dashboard: "dashboard",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

/*---------- Function to Upload Item Image --------- */

async function uploadItemImage(req, res) {
  upload(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.render("admin/admin_dashboard", {
            view: "Upload View",
            msg: "Error: File too large. Please upload an image less than 100KB.",
          });
        }
      } else {
        return res.render("admin/admin_dashboard", {
          view: "Upload View",
          msg: err.message,
        });
      }
    } else {
      if (req.file == undefined) {
        res.render("admin/admin_dashboard", {
          view: "Upload View",
          msg: "Error: No File Selected!",
        });
      } else {
        try {
          // const userId = req.user._id; // Assuming you have user ID available in req.user
          // const user = await Admin.findById(userId);

          // if (!user) {
          //     return res.status(400).send('User not found');
          // }

          // find new item from items collection
          const newItem = await Food.findById(req.params.id);

          if (!newItem) {
            return res.status(400).send("Item not found");
          }

          newItem.foodImage = {
            filename: req.file.filename,
            contentType: req.file.mimetype,
            imageBase64: fs.readFileSync(req.file.path).toString("base64"),
          };

          await newItem.save();
          res.render("admin/admin_dashboard", {
            view: "Upload View",
            msg: "Food Image Uploaded successfully!",
            file: `${req.file.filename}`,
          });
        } catch (error) {
          res.status(500).send("Server Error");
        }
      }
    }
  });
}

// Cteate new item
async function createNewItem(req, res) {
  try {
    const body = req.body;

    // if there is missing content inside req.body
    if (
      !body ||
      !body.itemName ||
      !body.category ||
      !body.price ||
      !body.description
    ) {
      return res
        .status(400)
        .render("admin/admin_dashboard", { msg: "All fields are required..." });
    }

    // create object of incoming new item
    const newItem = await Food.create({
      category: body.category,
      name: body.itemName,
      price: body.price,
      description: body.description,
      createdBy: req.user._id,
    });

    // fetch new item id
    const newItemId = newItem._id;
    console.log(newItemId);

    // Call funciton to upload food image
    // await uploadItemImage(req, res, newItemId);

    // update new item id to Admin collection
    await Admin.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        $push: {
          createdItem: newItemId,
        },
      }
    );

    // Succes status 201
    return res.status(201).render("admin/admin_dashboard", {
      msg: "new Item Created",
      itemId: newItemId,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Get listed items
async function getListedItems(req, res) {
  try {
    // admin id
    const adminId = req.user?._id; // Assuming you have user ID available in req.user
    const admin = await Admin.findById(adminId);

    console.log(adminId);
    console.log(admin);
    console.log(req.params.id);

    if (!admin) {
      return res.status(400).send("User not found");
    }

    // get food ids
    const foodIds = admin.createdItem;
    console.log(foodIds);

    // Fetch Food details
    const foodPromises = foodIds.map(async (foodId) => {
      return await Food.find({ _id: foodId });
    });

    // Using Promise.all to wait for all promises to resolve
    const foodDetails = (await Promise.all(foodPromises)).flat();
    console.log(foodDetails.length);
    const filteredItems = foodDetails.filter((foodItem) => {
      return foodItem.category === req.params.id;
    });
    console.log(filteredItems.length);

    res.status(200).render("admin/admin_dashboard", {
      foodDetails: filteredItems,
      foodLength: filteredItems.length,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// exports
module.exports = {
  handleAdminSignin,
  adminDashboard,
  createNewItem,
  uploadItemImage,
  getListedItems,
};
