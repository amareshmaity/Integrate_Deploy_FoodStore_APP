
// cart function (when user click on cart button)
function removeFromCart(button) {

    // Get parent element that contains food element
    var parentFoodEl = button.parentElement.parentElement;
  
    // Get text content inside foodNameEl (name of food)
    var foodName = parentFoodEl.children[1].textContent;
    
    // remove the element
    parentFoodEl.remove();
    
    // Prepare query parameters
    var queryParams = new URLSearchParams({
      foodName: foodName,
    }).toString();
  
    // Send the data to the server using fetch with query parameters
      fetch(`/cart/removeCartFromCart?${queryParams}`, {
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
    
          // update order summary
          const orderBdy = document.getElementById("order-bdy");
          orderBdy.children[0].children[1].innerHTML = data.subtotal;
          orderBdy.children[3].children[1].innerHTML = data.subtotal + (data.subtotal * 10) / 100;
      
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  
  }
  