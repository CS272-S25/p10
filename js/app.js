const ITEMS = getItems().items;

if (!localStorage.getItem("userCart")) {
    localStorage.setItem("userCart", JSON.stringify([]));
}

if (!localStorage.getItem("order")) {
    localStorage.setItem("order", JSON.stringify([]));
}


/*
* This function sets up the accessories, apparel, shoes, and checkout pages.
* For accessories, apparel, and shoes, it adds event listeners to buttons,
* allowing users to add/remove items from the cart.
* For the checkout page, it calls setupCart() to display the items.
*/
function setup() {
    let start = 0;
    let end = 0;

    const url = window.location.href;
    if (url.includes("accessories.html")) {
        start = 0;
        end = 4;
    } else if (url.includes("apparel.html")) {
        start = 4;
        end = 8;
    } else if (url.includes("shoes.html")) {
        start = 8;
        end = 12;
    } else if (url.includes("cart.html")) {
        setupCart();
        return;
    } else if (url.includes("checkout.html")) {
        setupCheckout();
        return;
    } else if (url.includes("order.html")) {
        setUpOrder();
        return;
    }

    let cart = new Set(JSON.parse(localStorage.getItem("userCart")));

    // this loop sets up buttons based on the start and end values set above
    for (let i = start; i < end; i++) {
        const item = ITEMS[i];
        const buttonId = "add-btn " + item.id;
        const button = document.getElementById(buttonId);

        if (!button) continue;

        updateCartButton(button, item.id, cart);

        button.addEventListener("click", () => {
            if (cart.has(item.id)) {
                cart.delete(item.id);
            } else {
                cart.add(item.id);
            }

            updateCartButton(button, item.id, cart);
            localStorage.setItem("userCart", JSON.stringify(Array.from(cart)));
        });
    }
}


/* 
* Helper function to update 'Add To Cart' button style and text.
*/
function updateCartButton(button, itemId, cartSet) {
    const inCart = cartSet.has(itemId);
    button.className = `btn ${inCart ? "in-cart" : "not-in-cart"}`;
    button.innerText = inCart ? "Added" : "Add To Cart";
}


/*
 * This function retrieves the user's cart from localStorage and displays each item
 * on the checkout page. It creates a container for each item using a flex-row layout,
 * placing the product image on the left and the name, brand, and price on the right.
 * It also calculates and displays the total cost of the items at the bottom.
 */
function setupCart() {
    const parentNode = document.getElementById("your-cart");
    parentNode.innerHTML = "";
    let cart = JSON.parse(localStorage.getItem("userCart"));
    let total = 0;
    for (let i = 0; i < ITEMS.length; i++) {
        if (cart.includes(ITEMS[i].id)) {
            total += parseInt(ITEMS[i].price.replace('$', ''));

            // Create card container with flexbox layout
            const newCardDivNode = document.createElement("div");
            newCardDivNode.className = "cart-item m-2 p-2 d-flex align-items-center";

            // Image
            const newImgNode = document.createElement("img");
            newImgNode.className = "cart-img m-3";
            newImgNode.src = ITEMS[i].image;
            newImgNode.alt = ITEMS[i].name;
            newImgNode.style.maxWidth = "100px";
            newImgNode.style.height = "auto";

            // Text content (name, brand, price)
            const newNameNode = document.createElement("h4");
            newNameNode.innerText = `${ITEMS[i].name}`;

            const newBrandNode = document.createElement("h5");
            newBrandNode.innerText = `${ITEMS[i].brand}`;

            const newPriceNode = document.createElement("h5");
            newPriceNode.innerText = `${ITEMS[i].price}`;

            // Add text content to card
            const textWrapper = document.createElement("div");
            textWrapper.className = "cart-text";

            textWrapper.appendChild(newNameNode);
            textWrapper.appendChild(newBrandNode);
            textWrapper.appendChild(newPriceNode);

            // Remove button
            const newButtonNode = document.createElement("button");
            newButtonNode.className = "btn btn-md fa-solid fa-xmark remove-btn";

            newButtonNode.addEventListener("click", function () {
                // Remove item from cart 
                const updatedCart = cart.filter(id => id !== ITEMS[i].id);
                // Update localStorage
                localStorage.setItem("userCart", JSON.stringify(updatedCart));
                // Refresh cart 
                setupCart();
            });

            // Add btn to card
            const btnWrapper = document.createElement("div");
            btnWrapper.className = 'ms-auto'
            btnWrapper.appendChild(newButtonNode);

            // Append image, text, and btn to card cont.
            newCardDivNode.appendChild(newImgNode);
            newCardDivNode.appendChild(textWrapper);
            newCardDivNode.appendChild(btnWrapper);

            // Add card to the parent
            parentNode.appendChild(newCardDivNode);
        }
    }
    if (cart.length === 0) { // empty cart
        const newNode = document.createElement("h2");
        newNode.innerText = "Cart is empty."
        parentNode.appendChild(newNode);
    } else { // cart total
        const newTotalNode = document.createElement("h4");
        newTotalNode.id = "cart-total";
        newTotalNode.innerText = `Total: $` + total;
        parentNode.append(newTotalNode);
    }
}


/*
* This function sets up the 'Total' inside of checkout 
*/
function setupCheckout() {
    // Create total text
    const parentNode = document.getElementById("your-total");
    parentNode.innerHTML = "";
    let cart = JSON.parse(localStorage.getItem("userCart"));
    let total = 0;
    for (let i = 0; i < ITEMS.length; i++) {
        if (cart.includes(ITEMS[i].id)) {
            total += parseInt(ITEMS[i].price.replace('$', ''));
        }
    }
    const newTotalNode = document.createElement("h4");
    newTotalNode.id = "checkout-total";
    newTotalNode.innerText = `Total: $` + total;
    parentNode.append(newTotalNode);
}


/*
* This function sets up the order details inside of order.html.
*/
function setUpOrder() {
    let parentNode = document.getElementById("your-order");
    parentNode.innerHTML = "";
    let order = JSON.parse(localStorage.getItem("order"));
    for (let i = 0; i < ITEMS.length; i++) {
        if (order.includes(ITEMS[i].id)) {

            // Create card container with flexbox layout
            const newCardDivNode = document.createElement("div");
            newCardDivNode.className = "cart-item m-2 p-2 d-flex align-items-center";

            // Image
            const newImgNode = document.createElement("img");
            newImgNode.className = "cart-img m-3";
            newImgNode.src = ITEMS[i].image;
            newImgNode.alt = ITEMS[i].name;
            newImgNode.style.maxWidth = "100px";
            newImgNode.style.height = "auto";

            // Text content (name, brand, price)
            const newNameNode = document.createElement("h4");
            newNameNode.innerText = `${ITEMS[i].name}`;

            const newBrandNode = document.createElement("h5");
            newBrandNode.innerText = `${ITEMS[i].brand}`;

            const newPriceNode = document.createElement("h5");
            newPriceNode.innerText = `${ITEMS[i].price}`;

            // Add text content to card
            const textWrapper = document.createElement("div");
            textWrapper.className = "cart-text";

            textWrapper.appendChild(newNameNode);
            textWrapper.appendChild(newBrandNode);
            textWrapper.appendChild(newPriceNode);

            // Append image and text to card cont.
            newCardDivNode.appendChild(newImgNode);
            newCardDivNode.appendChild(textWrapper);

            // Add card to the parent
            parentNode.appendChild(newCardDivNode);
        }
    }
    // TODO, populate 'your-info' (order.html) with user info
    parentNode = document.getElementById("your-info");
}


/*
* This function checks if any inputs on the checkout form are empty, 
* returning false if they are and true otherwise.
*/
function inputChecker() {
    // removes any alert messages that may have been created on a previous click
    for (let i = 1; i < 15; i++) {
        const alert = document.getElementById("alert_" + i);
        alert.innerText = ``;
    }
    let valid = true;
    for (let i = 1; i < 15; i++) {
        // state input is optional since the country might not be the U.S.
        if ((i != 8 && i != 6)) {
            const inp = document.getElementById("input_" + i);
            if (inp && inp.value == "") {
                valid = false; 
                //valid = true; // for testing only
                const alert = document.getElementById("alert_" + i);
                alert.innerText = `This field is required`;
            }
        }
    }
    return valid;
}


/*
* This function empties the user's cart.
*/
function empty() {    
    // Clear visual cart items from DOM
    const parentNode = document.getElementById("your-cart");
    parentNode.innerHTML = '';
    
    const newNode = document.createElement("h2");
    newNode.innerText = "Cart is empty."
    parentNode.appendChild(newNode);

    // Set userCart to an empty array (but keep key)
    localStorage.setItem('userCart', JSON.stringify([]));
}

/*
* This function checks if the user's cart is empty.
*/
function checkCart() {
    const cart = JSON.parse(localStorage.getItem("userCart"));
    const parentNode = document.getElementById("your-cart");

    if (cart.length === 0) {
        parentNode.innerHTML = "";
        const newNode = document.createElement("h2");
        newNode.innerText = "Add items to your cart before checking out."
        parentNode.appendChild(newNode);
    } else {
        window.location.href = 'checkout.html';
    }
}

/*
* This function saves and confirms the user's order.
*/
function confirm() {
    if (inputChecker()) {
        const cart = JSON.parse(localStorage.getItem("userCart"));
        localStorage.setItem('userCart', JSON.stringify([]));
        localStorage.setItem("order", JSON.stringify(Array.from(cart)));
        window.location.href = 'order.html';
    } else return;
}


window.onload = setup;