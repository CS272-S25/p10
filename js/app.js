const ITEMS = getItems().items;

if (!localStorage.getItem("userCart")) {
    localStorage.setItem("userCart", JSON.stringify([]));
}

if (!localStorage.getItem("order")) {
    localStorage.setItem("order", JSON.stringify([]));
}

if (!localStorage.getItem("userInfo")) {
    localStorage.setItem("userInfo", JSON.stringify([]));
}


/*
* This function sets up the accessories, apparel, shoes, and checkout pages.
* For accessories, apparel, and shoes, it adds event listeners to buttons and forms,
* allowing users to add/remove items from the cart and change their quantities.
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
        setupOrder();
        return;
    }

    let cart = new Set(JSON.parse(localStorage.getItem("userCart")));
    // this loop sets up buttons based on the start and end values set above
    for (let i = start; i < end; i++) {
        const item = ITEMS[i];
        const buttonId = "add-btn " + item.id;
        const button = document.getElementById(buttonId);
        const formId = "form_" + item.id;
        const form = document.getElementById(formId);
        if (!localStorage.getItem(formId) || localStorage.getItem(formId) == "") {
            localStorage.setItem(formId, 0);
        } else {
            form.value = localStorage.getItem(formId);
        }
        if (!button) continue;

        updateCartButton(button, item.id, cart);

        button.addEventListener("click", () => {
            if (cart.has(item.id)) {
                cart.delete(item.id);
                form.value = 0;
                localStorage.setItem(formId, 0);
            } else {
                cart.add(item.id);
                if (form.value == 0) {
                    form.value = 1;
                    localStorage.setItem(formId, 1);
                }
            }
            updateCartButton(button, item.id, cart);
            localStorage.setItem("userCart", JSON.stringify(Array.from(cart)));
        });
        form.addEventListener("input", () => {
            if (!localStorage.getItem(formId) || localStorage.getItem(formId) == "") {
                localStorage.setItem(formId, 0);
            } else {
                localStorage.setItem(formId, form.value);
            }
        })
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
    let amount = 0;
    for (let i = 0; i < ITEMS.length; i++) {
        const itemId = ITEMS[i].id
        if (cart.includes(itemId)) {
            amount = localStorage.getItem("form_" + itemId);
            //console.log(amount);
            for (let j = 0; j < amount; j++) { // build cart according to item amount

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

                // CART DELETE BUTTON (only deletes from localStorage)
                const newButtonNode = document.createElement("button");
                newButtonNode.className = "btn btn-md fa-solid fa-xmark remove-btn";

                newButtonNode.addEventListener("click", function () {
                    amount = localStorage.getItem("form_" + itemId);
                    //console.log(amount)
                    if (amount == 1) { // if amount is 1, remove item type from cart (localStorage)
                        const updatedCart = cart.filter(id => id !== itemId);
                        localStorage.setItem("userCart", JSON.stringify(updatedCart));
                    }
                    // localStorage item amount -= 1
                    localStorage.setItem("form_" + itemId, amount - 1);
                    setupCart(); // Refresh cart 
                });

                // Add delete btn to end of card
                const btnWrapper = document.createElement("div");
                btnWrapper.className = 'ms-auto'
                btnWrapper.appendChild(newButtonNode);
                // Append image, text, and btn to card cont.
                newCardDivNode.appendChild(newImgNode);
                newCardDivNode.appendChild(textWrapper);
                newCardDivNode.appendChild(btnWrapper);
                // Add card cont. to the parent
                parentNode.appendChild(newCardDivNode);
            }
        }
    }

    if (cart.length === 0) { // empty cart
        const newNode = document.createElement("h2");
        newNode.innerText = "Cart is empty."
        parentNode.appendChild(newNode);
    } else { // cart total
        const newTotalNode = document.createElement("h4");
        newTotalNode.id = "cart-total";
        newTotalNode.innerText = `Total: $` + getTotal();
        parentNode.append(newTotalNode);
    }
}


/*
* This function sets up the 'Total' inside of checkout 
*/
function setupCheckout() {
    //removes info from previous order
    localStorage.setItem("userInfo", JSON.stringify([]));
    // Create total text
    const parentNode = document.getElementById("your-total");
    parentNode.innerHTML = "";
    const newTotalNode = document.createElement("h4");
    newTotalNode.id = "checkout-total";
    newTotalNode.innerText = `Total: $` + getTotal();
    parentNode.append(newTotalNode);
}


/*
* Helper function for getting userCart total.
*/
function getTotal() {
    let cart = JSON.parse(localStorage.getItem("userCart"));
    let total = 0;
    for (let i = 0; i < ITEMS.length; i++) {
        if (cart.includes(ITEMS[i].id)) {
            let amt = JSON.parse(localStorage.getItem('form_' + ITEMS[i].id));
            total += amt * parseInt(ITEMS[i].price.replace('$', ''));
        }
    }
    return total;
}


/*
* This function sets up the order details inside of order.html.
*/
function setupOrder() {
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
    const newCardDivNode = document.createElement("div");
    newCardDivNode.className = "input-value m-2 p-2 d-flex flex-column align-items-start";
    parentNode = document.getElementById("your-info");
    const info = JSON.parse(localStorage.getItem("userInfo"));
    for (let i = 0; i < info.length; i++) {
        if (i == 1) {
            // makes sure first and last name are on one line
            const newNameNode = document.createElement("h5");
            const first = info[1];
            const last = info[2];
            newNameNode.innerText = first + " " + last;
            const textWrapper = document.createElement("div");
            textWrapper.className = "info-text";
            textWrapper.appendChild(newNameNode);
            newCardDivNode.appendChild(textWrapper);
            i++;
        } else if (i == 6) {
            // makes sure city and state are on one line
            const newNameNode = document.createElement("h5");
            const city = info[6];
            const state = info[7];
            newNameNode.innerText = city + ", " + state;
            const textWrapper = document.createElement("div");
            textWrapper.className = "info-text";
            textWrapper.appendChild(newNameNode);
            newCardDivNode.appendChild(textWrapper);
            i++;
        } else if (i == 11) {
            // censors the first 12 digits of the card number
            const newNameNode = document.createElement("h5");
            const card = info[11];
            newNameNode.innerText = "************" + card.substring(12);
            const textWrapper = document.createElement("div");
            textWrapper.className = "info-text";
            textWrapper.appendChild(newNameNode);
            newCardDivNode.appendChild(textWrapper);

        } else {
            const newNameNode = document.createElement("h5");
            const inp = info[i];
            newNameNode.innerText = inp;
            const textWrapper = document.createElement("div");
            textWrapper.className = "info-text";
            textWrapper.appendChild(newNameNode);
            newCardDivNode.appendChild(textWrapper);
        }
    }
    parentNode.appendChild(newCardDivNode);
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
        if ((i != 6) && (i == 8 ? (document.getElementById("input_10").value == "United States") : true)) {
            const inp = document.getElementById("input_" + i);

            // runs digitChecker() if the input is supposed to be a number
            const dig = ((i == 4 || i == 9 || i == 12 || i == 14) ? digitChecker(i) : true);
            if (inp && (!dig || (inp.value == "" || inp.value == "state link page" || inp.value == "N/A"))) {
                valid = false;
                //valid = true; // for testing only
                const alert = document.getElementById("alert_" + i);
                if (!dig && i == 4) {
                    alert.innerText = `Phone numbers must be 10 digits`;
                } else if (!dig && i == 9) {
                    alert.innerText = `ZIP codes must be 5 digits`;
                } else if (!dig && i == 12) {
                    alert.innerText = `Card numbers must be 16 digits`;
                } else if (!dig && i == 14) {
                    alert.innerText = `CVV must be 3 digits`;
                } else {
                    alert.innerText = `This field is required`;
                }
            }
        }
    }
    return valid;
}


/*
* This function checks that the inputs for phone number, ZIP code, card number, and CVV have the required digits.
*/
function digitChecker(num) {
    let regex;
    if (num == 4) {
        // phone number is 10 digits
        regex = /^\d{10}$/;
    } else if (num == 9) {
        // ZIP code is 5 digits
        regex = /^\d{5}$/;
    } else if (num == 12) {
        // card number is 16 digits
        regex = /^\d{16}$/;
    } else if (num == 14) {
        // CVV is 3 digits
        regex = /^\d{3}$/;
    }
    const inp = document.getElementById("input_" + num);
    return (inp.value.match(regex));
}


/*
* Helper function for emptying user's cart.
*/
function empty() {
    // Clear visual cart items from DOM
    const parentNode = document.getElementById("your-cart");
    parentNode.innerHTML = '';

    const newNode = document.createElement("h2");
    newNode.innerText = "Cart is empty."
    parentNode.appendChild(newNode);

    // Set userCart to an empty array (but keep key)
    reset();
    localStorage.setItem('userCart', JSON.stringify([]));
}


/*
* Helper function to reset quantity inputs and clear them from localStorage.
*/
function reset() {
    let cart = JSON.parse(localStorage.getItem("userCart"));
    for (let i = 0; i < ITEMS.length; i++) {
        if (cart.includes(ITEMS[i].id)) {
            const item = ITEMS[i].id;
            // Clear input fields in DOM
            const input = document.getElementById("form_" + item);
            if (input) {
                input.value = 0;
            }
            // Clear from localStorage
            localStorage.removeItem("form_" + item);
        }
    }
}


/*
* Helper function that checks if the user's cart is empty.
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
* Helper function that saves and confirms the user's order.
*/
function confirm() {
    if (inputChecker()) {
        const cart = JSON.parse(localStorage.getItem("userCart")); // save cart
        total = getTotal(); // get total before calling reset
        reset(); // call reset before before clearing cart
        localStorage.setItem('userCart', JSON.stringify([])); // clear cart
        localStorage.setItem("order", JSON.stringify(Array.from(cart)));
        const info = JSON.parse(localStorage.getItem("userInfo"));
        for (let i = 1; i < 16; i++) {
            if (i === 14) continue; // omit cvv
            const inp = document.getElementById("input_" + i);
            if (inp) {
                info.push(inp.value);
            } else {
                info.push("");
            }
        }
        info.push("Total: $" + total); // add total
        localStorage.setItem("userInfo", JSON.stringify(Array.from(info)));
        window.location.href = 'order.html';
    } else return;
}


window.onload = setup;