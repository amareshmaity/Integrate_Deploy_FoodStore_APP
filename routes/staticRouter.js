const express = require("express"); // import express
const router = express.Router(); // router

const {
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
} = require("../controllers/staticRoute");

// Define routing for users
router.get("/", fetchAllFoodItems);

// listed items
router.get("/listedItems/:id", getListedItems);

// Route to handle data sent via query parameters
router.get("/addWhislist", addToWishlist);

// Route to handle data sent via query parameters
router.get("/removeWhislist", removeFromWishlist);

// Route to handle data sent via query parameters
router.get("/addCart", addToCart);

// Route to handle data sent via query parameters
router.get("/removeCart", removeFromCart);

// get wishlist items
router.get("/wishlist", getWishlistItems);

// add to cart
router.get("/wishlist/addCart", addToCartFromWishlist);

// get cart items
router.get("/cart", getCartItems);

// get cart items
router.get("/cart", getCartItems);

// remove to cart
router.get("/cart/removeCartFromCart", removeCartFromCart);


module.exports = router;
