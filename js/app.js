const ITEMS = getItems().items;

if (!localStorage.getItem("userCart")) {
    localStorage.setItem("userCart", JSON.stringify([]));
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
    } else if (url.includes("checkout.html")) {
        setupCart();
        return;
    } else if (url.includes("checkout2.html")) {
        setupCheckout();
        return;
    }

    let cart = new Set(JSON.parse(localStorage.getItem("userCart")) || []);

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
* Helper function to update the button style and text.
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
    parentNode = document.getElementById("your-cart");
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

            // Button
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

    const newTotalNode = document.createElement("h4");
    newTotalNode.id = "cart-total";
    newTotalNode.innerText = `Total: $` + total;
    parentNode.append(newTotalNode);
    localStorage.setItem("userCart", JSON.stringify(cart));
}

function setupCheckout() {
    // Create total text
    parentNode = document.getElementById("your-total");
    parentNode.innerHTML = "";
    let cart = JSON.parse(localStorage.getItem("userCart"));
    let total = 0;
    for (let i = 0; i < ITEMS.length; i++) {
        if (cart.includes(ITEMS[i].id)) {
            total += parseInt(ITEMS[i].price.replace('$', ''));
        }
    }
    const newTotalNode = document.createElement("h4");
    newTotalNode.id = "cart-total2";
    newTotalNode.innerText = `Total: $` + total;
    parentNode.append(newTotalNode); 

    // Sets up the confirm button so you can only checkout if you have items in the cart and filled out all fields
    const button = document.getElementById("confirm_btn");
    button.addEventListener("click", () => {
        // Checks if any inputs are empty
        if (inputChecker() && total > 0) {
            empty()
            window.location.href = "http://127.0.0.1:3000/p10/checkout/checkout3.html";
        }
    });
    
    localStorage.setItem("userCart", JSON.stringify(cart));
}

/*
* This function checks if any inputs on the checkout form are empty, 
* returning false if they are and true otherwise.
*/
function inputChecker() {
    let noBlanks = true;
    for (let i = 1; i <= 14; i++) {
        // this allows the state field to be blank if the country isn't the U.S.
        if (!((i == 8) && document.getElementById("input_10").value != "United States")) {
            const inp = document.getElementById("input_" + i);
            if (inp.value == "") {
                noBlanks = false;
                const alert = document.getElementById("alert_" + i);
                alert.innerText = `This field is required`;
            }
        }
    }

    
    if (noBlanks) {
        // removes any alert messages that may have been created
        for (let i = 1; i <= 14; i++) {
            const alert = document.getElementById("alert_" + i);
            alert.innerText = ``;
        }
    }
    return noBlanks;
}
/*
* This function empties the user's cart.
*/
function empty() {
    // Set userCart to an empty array (but keep key)
    localStorage.setItem('userCart', JSON.stringify([]));

    // Clear visual cart items from DOM
    const parentNode = document.getElementById("your-cart");
    while (parentNode.lastElementChild) {
        parentNode.removeChild(parentNode.lastElementChild);
    }
}

/*
* This function checks if the user's cart is empty.
*/
function checkCart() {
    const cart = JSON.parse(localStorage.getItem("userCart")) || [];
    if (cart.length === 0) {
        alert("Please add items to your cart first.");
    } else {
        window.location.href = 'checkout2.html';
    }
}

/*
* This function saves and confirms the user's order.
*/
function confirm() {
    const cart = JSON.parse(localStorage.getItem("userCart")) || [];
    localStorage.setItem("order", JSON.stringify(Array.from(cart)));
    window.location.href = 'checkout3.html';
    empty();
}


window.onload = setup;

