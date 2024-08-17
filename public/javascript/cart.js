console.log("Script loaded successfully");

document.addEventListener("DOMContentLoaded", function () {});

// Your script logic here
// add to cart
function addCart(button, queryParams) {
  const classes = button.classList;
  classes.remove("orange-btn");
  classes.add("white-bth");
  button.innerHTML = "Remove Cart";
  console.log(button);

  // Send the data to the server using fetch with query parameters
  fetch(`/addCart?${queryParams}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      // Replace the current content with the rendered EJS
      const targetElement = document.getElementById("cart-count");

      if (data.cartLen > 0) {
        targetElement.innerHTML = data.cartLen;
        targetElement.parentElement.classList?.add("crimson");
        targetElement.parentElement.classList?.remove("black");
      } else {
        targetElement.innerHTML = "";
        targetElement.parentElement.classList?.add("black");
        targetElement.parentElement.classList?.remove("crimson");
      }

      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// remove from cart
function removeCart(button, queryParams) {
  const classes = button.classList;
  classes.add("orange-btn");
  classes.remove("white-bth");
  button.innerHTML = "Add to Cart";
  console.log(button);

  // Send the data to the server using fetch with query parameters
  fetch(`/removeCart?${queryParams}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      // Replace the current content with the rendered EJS
      const targetElement = document.getElementById("cart-count");

      if (data.cartLen > 0) {
        targetElement.innerHTML = data.cartLen;
        targetElement.parentElement.classList?.add("crimson");
        targetElement.parentElement.classList?.remove("black");
      } else {
        targetElement.innerHTML = "";
        targetElement.parentElement.classList?.add("black");
        targetElement.parentElement.classList?.remove("crimson");
      }

      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// cart function (when user click on cart button)
function cart(button) {
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

  if (btnTxt === "add to cart") {
    addCart(button, queryParams);
  } else {
    removeCart(button, queryParams);
  }
}
