
// cart function (when user click on cart button)
function addToCart(button) {

  // Get element that contains food name
  var foodNameEl = button.parentElement.parentElement.children[1];

  // Get text content inside foodNameEl (name of food)
  var foodName = foodNameEl.textContent;

  // Prepare query parameters
  var queryParams = new URLSearchParams({
    foodName: foodName,
  }).toString();

  // Send the data to the server using fetch with query parameters
    fetch(`/wishlist/addCart?${queryParams}`, {
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
