// add to wishlist
function addWishList(button, queryParams) {
  const classes = button.classList;
  classes.remove("orange-btn");
  classes.add("white-bth");
  button.innerHTML = "Remove Whishlist";
  console.log(button);

  // Send the data to the server using fetch with query parameters
  fetch(`/addWhislist?${queryParams}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      // Replace the current content with the rendered EJS
      const targetElement = document.getElementById("wishlist-count");
      //   // Acess heart button
      //   const heartBtn =
      //     button.parentElement.parentElement.parentElement.parentElement
      //       .children[0].children[1].children[0];
      if (data.wishListLen > 0) {
        targetElement.innerHTML = data.wishListLen;
        targetElement.parentElement.classList?.add("crimson");
        targetElement.parentElement.classList?.remove("black");

        // add and remove classes
        // heartBtn.classList?.add("crimson");
        // heartBtn.classList?.remove("black");
      } else {
        targetElement.innerHTML = "";
        targetElement.parentElement.classList?.add("black");
        targetElement.parentElement.classList?.remove("crimson");

        // // add and remove classes
        // heartBtn.classList?.remove("crimson");
        // heartBtn.classList?.add("black");
      }

      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// remove from wishlist
function removeWishList(button, queryParams) {
  const classes = button.classList;
  classes.add("orange-btn");
  classes.remove("white-bth");
  button.innerHTML = "Add to Wishlist";
  console.log(button);

  // Send the data to the server using fetch with query parameters
  fetch(`/removeWhislist?${queryParams}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      // Replace the current content with the rendered EJS
      const targetElement = document.getElementById("wishlist-count");

      //   // Acess heart button
      //   const heartBtn =
      //     button.parentElement.parentElement.parentElement.parentElement;
      if (data.wishListLen > 0) {
        targetElement.innerHTML = data.wishListLen;
        targetElement.parentElement.classList?.add("crimson");
        targetElement.parentElement.classList?.remove("black");

        // // add and remove classes
        // heartBtn.classList?.add("crimson");
        // heartBtn.classList?.remove("black");
      } else {
        targetElement.innerHTML = "";
        targetElement.parentElement.classList?.add("black");
        targetElement.parentElement.classList?.remove("crimson");

        // // add and remove classes
        // heartBtn.classList?.remove("crimson");
        // heartBtn.classList?.add("black");
      }

      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function wishList(button) {
  let btnTxt = button.textContent.toLowerCase().trim();
  console.log(btnTxt);
  // Get the card footer element of the button
  var cardFooterEl = button.parentElement.parentElement.parentElement;

  // Get element that contains food name
  var foodNameEl = cardFooterEl.parentElement.children[2].children[0];

  // Get text content inside foodNameEl (name of food)
  var foodName = foodNameEl.textContent;

  // Get the inner HTML of the container
  // var content = container.innerHTML;

  // Prepare query parameters
  var queryParams = new URLSearchParams({
    foodName: foodName,
  }).toString();

  if (btnTxt === "add to wishlist") {
    addWishList(button, queryParams);
  } else {
    removeWishList(button, queryParams);
  }
}
