document.addEventListener('DOMContentLoaded', function() {
    displayItems();
    displaySummary();
    deleteHeaders();
    document.querySelector('.confirmButton').addEventListener('click', blurryLoad);
    applyDiscount();
    setupAboutPopup();
});

function displayItems() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cart_items_container = document.getElementById('cartContent');
    let empty_message = document.getElementById('emptyCartMessage');

    // Clear existing items
    cart_items_container.innerHTML = '';

    if (cartItems.length > 0) {
        empty_message.style.display = 'none';

        // Create a row for each cart item
        for (let i = 0; i < cartItems.length; i++) {
            let item = cartItems[i];
            let row = document.createElement('tr');
            cart_items_container.appendChild(row);

            // Image cell
            let img = document.createElement('td');
            let img_tag = document.createElement('img');
            img_tag.src = item.imageUrl;
            img_tag.alt = item.name;
            img_tag.width = 50;
            img.appendChild(img_tag);
            row.appendChild(img);

            // Name cell
            let item_name = document.createElement('td');
            item_name.textContent = item.name;
            row.appendChild(item_name);

            // Price cell
            let item_price = document.createElement('td');
            item_price.id = `item-price-${i}`;
            item_price.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
            row.appendChild(item_price);

            // Quantity cell
            let item_quantity = document.createElement('td');
            let less_quantity_button = document.createElement('button');
            let more_quantity_button = document.createElement('button');
            let quantity_display = document.createElement('span');
            quantity_display.id = `item-quantity-${i}`;
            quantity_display.textContent = item.quantity;
            quantity_display.style.margin = '0 10px';

            less_quantity_button.textContent = '-';
            less_quantity_button.style.borderRadius = '5px';
            less_quantity_button.style.backgroundColor = '#f0f0f0'; 
            less_quantity_button.onclick = function () {
                decreaseQuantity(i);
            };

            more_quantity_button.textContent = '+';
            more_quantity_button.style.borderRadius = '5px';
            more_quantity_button.style.backgroundColor = '#f0f0f0'; 
            more_quantity_button.onclick = function () {
                increaseQuantity(i);
            };

            item_quantity.appendChild(less_quantity_button);
            item_quantity.appendChild(quantity_display);
            item_quantity.appendChild(more_quantity_button);
            row.appendChild(item_quantity);

            // Delete icon cell
            let deleting = document.createElement('td');
            let delete_button = document.createElement('button');
            let delete_icon = document.createElement('img');

            delete_icon.src = 'delete.png';
            delete_icon.alt = 'delete';
            delete_icon.style.width = '20px';
            delete_icon.style.height = '20px';

            delete_button.appendChild(delete_icon);
            delete_button.onclick = function () {
                row.classList.add('fade-out');
                setTimeout(() => deleteItem(i), 500);
            };

            deleting.appendChild(delete_button);
            row.appendChild(deleting);
        }
    } else {
        deleteHeaders();
        empty_message.style.display = 'block';
    }
}

function increaseQuantity(i) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems[i].quantity += 1;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update the quantity directly in the DOM
    document.getElementById(`item-quantity-${i}`).textContent = cartItems[i].quantity;
    document.getElementById(`item-price-${i}`).textContent = `$${(cartItems[i].price * cartItems[i].quantity).toFixed(2)}`;
    displaySummary();
    applyDiscount();
}

function decreaseQuantity(i) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems[i].quantity > 1) {
        cartItems[i].quantity -= 1;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Update the quantity directly in the DOM
        document.getElementById(`item-quantity-${i}`).textContent = cartItems[i].quantity;
        document.getElementById(`item-price-${i}`).textContent = `$${(cartItems[i].price * cartItems[i].quantity).toFixed(2)}`;
        displaySummary(); 
        displayItems(); 
        applyDiscount();
    } else {
        deleteItem(i);
    }
}

function deleteItem(i) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(i, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayItems();
    applyDiscount();
    displaySummary();
}

function displaySummary() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let sub_total = 0;
    for (let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i];
        sub_total += item.price * item.quantity;
    }
    let estimated_tax = sub_total * 0.08875;
    let fee = 0.5;
    document.getElementById('subTotal').textContent = `Subtotal: $${sub_total.toFixed(2)}`;
    document.getElementById('estimatedTax').textContent = `Estimated Tax: $${estimated_tax.toFixed(2)}`;
    
    if(cartItems.length == 0) {
        document.getElementById('fee').textContent = `Fee: $0`;
    } else {
        document.getElementById('fee').textContent = `Fee: $${fee.toFixed(2)}`;
    }

    let total = sub_total + estimated_tax + fee;
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

function blurryLoad() {
    const overlay = document.getElementById('overlay');
    const mainContent = document.querySelector('main'); 
    const loadText = document.querySelector('.counter');
    const loadingText = document.querySelector('.loading-text');
    const confirmationText = document.querySelector('.confirmation-text');
    const bgFront = document.querySelector('.loadingBarFront');
    const bgBack = document.querySelector('.loadingBarBack');
    let load = 0;

    overlay.style.display = 'flex';
    mainContent.classList.add('blur'); 

    bgBack.style.display = 'block'; 

    let int = setInterval(function() {
        load++;
        if (load <= 100) {
            loadText.innerText = `${load}%`;
            bgFront.style.display = 'block'; 
            bgFront.style.width = `${load}%`;
            bgBack.style.display = 'none'; 
        }

        if (load >= 100) {
            clearInterval(int);
            bgFront.style.display = 'none'; 
            setTimeout(() => {
                loadText.style.display = 'none';
                loadingText.style.display = 'none';
                confirmationText.style.display = 'block';
                bgBack.style.display = 'block'; 
                bgBack.style.backgroundColor = 'green';
                mainContent.classList.remove('blur'); 
            }, 500);
        }
    }, 20);
}

function deleteHeaders() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if(cartItems.length == 0) {
        document.getElementById('cartTable').style.display ='none';
        document.getElementById('aside').style.display ='none';
        document.getElementById('progressBar').style.display ='none';
        document.getElementById('emptyCartMessage').style.backgroundColor ='white';
    }
}

function applyDiscount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const maxThreshold = 40; 
    const progressBar = document.getElementById('progressBar');
    const percentFilled = Math.min(subtotal / maxThreshold * 100, 100);

    progressBar.style.width = `${percentFilled}%`;

    let discount = 0;
    if (subtotal >= maxThreshold) {
        discount = 0.10 * subtotal; 
        document.getElementById('discountMessage').textContent = 'A 10% discount has been applied.';
    } else {
        document.getElementById('discountMessage').textContent = '';
    }

    let total = subtotal - discount;

    // Update UI
    document.getElementById('subTotal').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

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
