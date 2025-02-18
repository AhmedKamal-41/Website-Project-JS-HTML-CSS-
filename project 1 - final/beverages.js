// Merlyn Pothen

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

document.addEventListener('DOMContentLoaded', function () {
  updateCartCountDisplay(); // Call to update the display based on localStorage
});

function addToCart(itemId) {
  const items = {
    "cocacola001": {
      id: "cocacola001",
      name: "Coca Cola",
      price: 2.98,
      quantity: 1,
      imageUrl: "DC_202402_0521_MediumCoke_ContourGlassv1_1564x1564_nutrition-calculator-tile.jpg"
    },
    "dietcoke002": {
      id: "dietcoke002",
      name: "Diet Coke",
      price: 2.25,
      quantity: 1,
      imageUrl: "DC_202112_0652_MediumDietCoke_Glass_1564x1564-1_nutrition-calculator-tile.jpg"
    },
    "drpepper003": {
      id: "drpepper003",
      name: "Dr Pepper",
      price: 2.48,
      quantity: 1,
      imageUrl: "DC_201905_0421_MediumDrPepper_Glass_1564x1564-1_nutrition-calculator-tile.jpg"
    },
    "fanta004": {
      id: "fanta004",
      name: "Fanta",
      price: 2.89,
      quantity: 1,
      imageUrl: "DC_202212_1262_MediumFantaOrange_Glass_1564x1564-1_nutrition-calculator-tile.jpg"
    },
    "hic005": {
      id: "hic005",
      name: "Hi-C",
      price: 2.28,
      quantity: 1,
      imageUrl: "DC_202012_0621_MediumHi-COrange_1564x1564-1_nutrition-calculator-tile.jpg"
    },
    "sprite006": {
      id: "sprite006",
      name: "Sprite",
      price: 2.68,
      quantity: 1,
      imageUrl: "DC_202212_0721_MediumSprite_Glass_1564x1564-1_nutrition-calculator-tile.jpg"
    },
    "regularcoffee007": {
      id: "regularcoffee007",
      name: "Regular Coffee",
      price: 1.59,
      quantity: 1,
      imageUrl: "3256_medium_US_en.png"
    },
    "flavorcoffee008": {
      id: "flavorcoffee008",
      name: "Vanilla Chocolate Caramel Coffee",
      price: 2.29,
      quantity: 1,
      imageUrl: "3247_medium_US_en.png"
    },
    "coldcoffee009": {
      id: "coldcoffee009",
      name: "Cold Coffee",
      price: 2.19,
      quantity: 1,
      imageUrl: "3244_medium_US_en.png"
    },
    "purelife010": {
      id: "purelife010",
      name: "Pure Life",
      price: 2.59,
      quantity: 1,
      imageUrl: "c64aba785f4168f3465a2f911e084fe41b5038b0-1333x1333.webp"
    },
    "dasani011": {
      id: "dasani011",
      name: "Dasani",
      price: 1.19,
      quantity: 1,
      imageUrl: "DC_202402_5474_DasaniBottledWater_1564x1564_nutrition-calculator-tile.jpg"
    },
    "vitamin012": {
      id: "vitamin012",
      name: "Vitamin Water",
      price: 1.68,
      quantity: 1,
      imageUrl: "vitaminwaterxxxbottle_side_herohorizontal_regular_desktop_1112x1280.avif"
    },
    "minutemaid013": {
      id: "minutemaid013",
      name: "Minute Maid Orange Juice",
      price: 1.25,
      quantity: 1,
      imageUrl: "DC_202212_3582_MediumMinuteMaidPremiumOrangeJuice_1564x1564-1.jpg"
    },
    "simplyorange014": {
      id: "simplyorange014",
      name: "Simply Orange Juice",
      price: 3.98,
      quantity: 1,
      imageUrl: "2767_medium_US_en.png"
    },
    "applejuice015": {
      id: "applejuice015",
      name: "Apple Juice",
      price: 3.86,
      quantity: 1,
      imageUrl: "DC_202008_0322_HonestKidsAppleJuice_1564x1564.jpg"
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