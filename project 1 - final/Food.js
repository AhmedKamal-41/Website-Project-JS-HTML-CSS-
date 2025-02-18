// Udemy code from Animated Navigation
const toggle = document.querySelector('#toggle');
const nav = document.querySelector('#nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

//Udemy code from Hidden Search Widget
const search = document.querySelector('.search');
const btn = document.querySelector('.btn');
const input = document.querySelector('.input');

btn.addEventListener('click', () => {
  search.classList.toggle('active');
  input.focus();
});
function addToCart(itemId) {
  const items = {
    "cheeseburger001": {
      id: "cheeseburger001",
      name: "Cheeseburger",
      price: 5.99,
      quantity: 1,
      imageUrl: "Cheeseburger.jpg"
    },
    "chickensandwich002": {
      id: "chickensandwich002",
      name: "Chicken Sandwich",
      price: 4.99,
      quantity: 1,
      imageUrl: "chicken sandwich.jpg"
    },
    "regularpizza003": {
      id: "regularpizza003",
      name: "Regular Pizza",
      price: 1.50,
      quantity: 1,
      imageUrl: "regular pizza.jpg"
    },
    "veggiepizza004": {
      id: "veggiepizza004",
      name: "Veggie Pizza",
      price: 2.50,
      quantity: 1,
      imageUrl: "veggie pizza.jpg"
    },
    "buffalowings005": {
      id: "buffalowings005",
      name: "Buffalo Wings",
      price: 8.99,
      quantity: 1,
      imageUrl: "buffalo wings.jpg"
    },
    "mangohabanero006": {
      id: "mangohabanero006",
      name: "Mango Habanero",
      price: 8.99,
      quantity: 1,
      imageUrl: "Mango Habanero.jpg"
    },
    "garlicparmesan007": {
      id: "garlicparmesan007",
      name: "Garlic Parmesan",
      price: 8.99,
      quantity: 1,
      imageUrl: "Garlic Parmesan.jpg"
    },
    "fries008": {
      id: "fries008",
      name: "Fries",
      price: 1.99,
      quantity: 1,
      imageUrl: "fries.jpg"
    },
    "onionrings009": {
      id: "onionrings009",
      name: "Onion Rings",
      price: 2.99,
      quantity: 1,
      imageUrl: "onion rings.jpg"
    },
    "chickennuggets010": {
      id: "chickennuggets010",
      name: "Chicken Nuggets",
      price: 4.99,
      quantity: 1,
      imageUrl: "chicken nuggets.jpg"
    }
  };

  // Get the selected item by ID
  let selectedItem = items[itemId];
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
