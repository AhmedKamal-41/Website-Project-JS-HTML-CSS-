document.addEventListener('DOMContentLoaded', function () {
    updateCartCountDisplay();
      setupAboutPopup();
  });
 
  
  // Define items for the "Featured Items" section
  const featuredItems = {
    "fries001": {
      id: "fries001",
      name: "Fries",
      price: 1.99,
      quantity: 1,
      imageUrl: "images/fries.jpg"
    },
    "pizza002": {
      id: "pizza002",
      name: "Regular Pizza",
      price: 2.99,
      quantity: 1,
      imageUrl: "images/regular_pizza.jpg"
    },
    "nuggets003": {
      id: "nuggets003",
      name: "Chicken Nuggets",
      price: 3.49,
      quantity: 1,
      imageUrl: "images/chicken_nuggets.jpg"
    },
    "soda004": {
      id: "soda004",
      name: "Soda",
      price: 0.99,
      quantity: 1,
      imageUrl: "images/dr-pepper.jpeg"
    }
  };
  
  // Function to add item to the cart based on item ID
  function addToCart(itemId) {
    // Get the selected item by ID
    let selectedItem = featuredItems[itemId];
    if (!selectedItem) return; // Exit if item ID is invalid
  
    // Retrieve existing items from localStorage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    // Check if the item is already in the cart
    let existingItem = cartItems.find(item => item.id === selectedItem.id);
    if (existingItem) {
      // If item exists, increase the quantity
      existingItem.quantity += 1;
    } else {
      // Otherwise, add new item to the cart
      cartItems.push(selectedItem);
    }
  
    // Save the updated items back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
    // Update cart count after adding an item
    updateCartCount();
    updateCartCountDisplay();
  }
  
  // Function to update the total items count in the cart
  function updateCartCount() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  
    // Save the new cart count to localStorage
    localStorage.setItem('cartCount', totalQuantity);
  }
  
  // Function to display the cart count on the page
  function updateCartCountDisplay() {
    const cartCountElement = document.querySelector('.cart-count'); // Assume there's an element with class 'cart-count' to show the count
    let cartCount = localStorage.getItem('cartCount') || 0;
    if (cartCountElement) {
      cartCountElement.textContent = cartCount;
    }
  }
  
  // Listen for visibility change to update cart count display when navigating back
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
      updateCartCountDisplay();
    }
  });
  
  // Listen for changes in localStorage across tabs/pages
  window.addEventListener('storage', function (event) {
    if (event.key === 'cartItems' || event.key === 'cartCount') {
      updateCartCountDisplay();
    }
  });
  function setupAboutPopup() {
    const aboutLink = document.getElementById('aboutLink');
    const popup = document.getElementById('popup');
    const closeButton = document.getElementById('closePopupButton'); // Make sure this matches your close button's ID

    aboutLink.addEventListener('click', function(event) {
        event.preventDefault(); // Stop the link from navigating
        popup.style.display = 'block'; // Show the popup
    });

    closeButton.addEventListener('click', function() {
        popup.style.display = 'none'; // Hide the popup
    });
}
