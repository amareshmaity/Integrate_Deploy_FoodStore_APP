const { Admin } = require("../models/admin");
const { Food } = require("../models/food");

async function fetchAllFoodItems(req, res) {
  try {
    // Get food items
    const foods = await Food.find({});
    const allFoodCategories = foods.map((food) => {
      return food.category;
    });
    const foodCategories = [...new Set(allFoodCategories)];

    // Session cookies
    // Retrieve the current wishlist from the cookies, or initialize an empty array if it doesn't exist
    let wishlist = req.cookies.wishlist ? JSON.parse(req.cookies.wishlist) : [];
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    return res.render("home", {
      allFoodItems: foods,
      foodCategories: foodCategories,
      wishListLen: wishlist.length,
      cartLen: cart.length,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Get listed items
async function getListedItems(req, res) {
  try {
    // Session cookies
    // Retrieve the current wishlist from the cookies, or initialize an empty array if it doesn't exist
    let wishlist = req.cookies.wishlist ? JSON.parse(req.cookies.wishlist) : [];

    const foods = await Food.find({});
    const allFoodCategories = foods.map((food) => {
      return food.category;
    });
    const filteredItems = foods.filter((foodItem) => {
      return foodItem.category === req.params.id;
    });
    return res.render("home", {
      filteredItems: filteredItems,
      foodLength: filteredItems.length,
      wishListLen: wishlist.length,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Add item to wishlist
async function addToWishlist(req, res) {
  try {
    // food name
    const { foodName } = req.query;

    // Get food items
    // const foods = await Food.find({ name: foodName });

    // Retrieve the current wishlist from the cookies, or initialize an empty array if it doesn't exist
    let wishlist = req.cookies.wishlist ? JSON.parse(req.cookies.wishlist) : [];

    // Add the ID of the first food item to the wishlist array
    // wishlist.push(foods[0]._id);
    wishlist.push(foodName);

    // Save the updated wishlist back to the cookies, setting the cookie to expire in 1800,000 milliseconds (30 minutes)
    // The cookie is marked as httpOnly to prevent client-side scripts from accessing it
    res.cookie("wishlist", JSON.stringify(wishlist), {
      // maxAge: 900000, // 30 minutes
      httpOnly: true, // Secure the cookie so it can't be accessed by JavaScript on the client side
    });

    console.log("Updated Wishlist:", wishlist);
    const wishListLen = wishlist.length;
    console.log(wishListLen);

    res.json({ wishListLen: wishlist.length });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Remove item from wishlist
async function removeFromWishlist(req, res) {
  try {
    // food name
    const { foodName } = req.query;
    const wishlist = req.cookies.wishlist
      ? JSON.parse(req.cookies.wishlist)
      : [];
    const index = wishlist.indexOf(foodName); //item to remove

    // If the item is found, remove it
    if (index > -1) {
      wishlist.splice(index, 1);
    }

    // Update the cookie with the modified array
    res.cookie("wishlist", JSON.stringify(wishlist), {
      // maxAge: 900000, // 15 minutes
      httpOnly: true, // Secure the cookie so it can't be accessed by JavaScript on the client side
    });

    res.json({ wishListLen: wishlist.length });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Add item to cart
async function addToCart(req, res) {
  try {
    // food name
    const { foodName } = req.query;

    // Get food items
    // const foods = await Food.find({ name: foodName });

    // Retrieve the current cart from the cookies, or initialize an empty array if it doesn't exist
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    // Add the ID of the first food item to the cart array
    // wishlist.push(foods[0]._id);
    cart.push(foodName);

    // Save the updated wishlist back to the cookies, setting the cookie to expire in 1800,000 milliseconds (30 minutes)
    // The cookie is marked as httpOnly to prevent client-side scripts from accessing it
    res.cookie("cart", JSON.stringify(cart), {
      // maxAge: 900000, // 30 minutes
      httpOnly: true, // Secure the cookie so it can't be accessed by JavaScript on the client side
    });

    console.log("Updated Cart:", cart);
    const cartLen = cart.length;
    console.log(cartLen);

    res.json({ cartLen: cart.length });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Remove item from wishlist
async function removeFromCart(req, res) {
  try {
    // food name
    const { foodName } = req.query;
    const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    const index = cart.indexOf(foodName); //item to remove

    // If the item is found, remove it
    if (index > -1) {
      cart.splice(index, 1);
    }

    // Update the cookie with the modified array
    res.cookie("cart", JSON.stringify(cart), {
      // maxAge: 900000, // 15 minutes
      httpOnly: true, // Secure the cookie so it can't be accessed by JavaScript on the client side
    });

    res.json({ cartLen: cart.length });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Get wishlist items
async function getWishlistItems(req, res) {
  try {
    // Retrieve the current wishlist from the cookies, or initialize an empty array if it doesn't exist
    let wishlist = req.cookies.wishlist ? JSON.parse(req.cookies.wishlist) : [];
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    // Get food items
    const foodPromises = wishlist.map(async (foodName) => {
      return await Food.find({ name: foodName });
    });
    // Using Promise.all to wait for all promises to resolve
    const wishlistFoodDetails = (await Promise.all(foodPromises)).flat();

    console.log(wishlistFoodDetails)

    res.render( "wishlist", {
      wishlistFoods: wishlistFoodDetails,
      wishListLen: wishlist.length,
      cartLen: cart.length,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}


// Add item to cart from wishlist page
async function addToCartFromWishlist(req, res) {
  try {
    // food name
    const { foodName } = req.query;
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    cart.push(foodName);
    res.cookie("cart", JSON.stringify(cart), {
      // maxAge: 900000, // 30 minutes
      httpOnly: true, // Secure the cookie so it can't be accessed by JavaScript on the client side
    });
    res.json({ cartLen: cart.length });
  } catch (error) {
    res.status(400).send(error.message);
  }
}


// Get cart items
async function getCartItems(req, res) {
  try {
    let wishlist = req.cookies.wishlist ? JSON.parse(req.cookies.wishlist) : [];
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    // Get food items
    const foodPromises = cart.map(async (foodName) => {
      return await Food.find({ name: foodName });
    });
    // Using Promise.all to wait for all promises to resolve
    const cartFoodDetails = (await Promise.all(foodPromises)).flat();

    console.log(cartFoodDetails)

    // Calculate total price of food items
    const subtotal = cartFoodDetails.reduce((accumulator, food) => {
      return accumulator + food.price;
    }, 0);

    console.log(subtotal)

    res.render( "cart", {
      cartFoods: cartFoodDetails,
      wishListLen: wishlist.length,
      cartLen: cart.length,
      subtotal: subtotal
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Remove item from cart from cart page
async function removeCartFromCart(req, res) {
  try {
    // food name
    const { foodName } = req.query;
    const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    const index = cart.indexOf(foodName); //item to remove

    // If the item is found, remove it
    if (index > -1) {
      cart.splice(index, 1);
    }

    // Update the cookie with the modified array
    res.cookie("cart", JSON.stringify(cart), {
      httpOnly: true,
    });

    // Get food items
    const foodPromises = cart.map(async (foodName) => {
      return await Food.find({ name: foodName });
    });
    // Using Promise.all to wait for all promises to resolve
    const cartFoodDetails = (await Promise.all(foodPromises)).flat();

    // console.log(cartFoodDetails)

    // Calculate total price of food items
    const subtotal = cartFoodDetails.reduce((accumulator, food) => {
      return accumulator + food.price;
    }, 0);

    console.log(subtotal)    

    res.json({ cartLen: cart.length, subtotal: subtotal});
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  fetchAllFoodItems,
  getListedItems,
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  getWishlistItems,
  addToCartFromWishlist,
  getCartItems,
  removeCartFromCart
};
