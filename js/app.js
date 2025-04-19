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
    let parentNode = document.getElementById("your-cart");
    let cart = JSON.parse(localStorage.getItem("userCart"));
    let total = 0;
    for (let i = 0; i < ITEMS.length; i++) {
        if (cart.includes(ITEMS[i].id)) {
            total += parseInt(ITEMS[i].price.replace('$', ''));

            // Create card container with flexbox layout
            const newCardDivNode = document.createElement("div");
            newCardDivNode.className = "cart-item  m-2 p-2 flex-row align-items-center";

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
            newNameNode.style.color = "black";

            const newBrandNode = document.createElement("h5");
            newBrandNode.innerText = `${ITEMS[i].brand}`;
            newBrandNode.style.color = "black";

            const newPriceNode = document.createElement("h5");
            newPriceNode.innerText = `${ITEMS[i].price}`;
            newPriceNode.style.color = "black";

            // Add text content to card
            const textWrapper = document.createElement("div");
            textWrapper.className = "cart-text";

            textWrapper.appendChild(newNameNode);
            textWrapper.appendChild(newBrandNode);
            textWrapper.appendChild(newPriceNode);

            // Append image and text to card
            newCardDivNode.appendChild(newImgNode); // Image on the left
            newCardDivNode.appendChild(textWrapper); // Text on the right

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

/*
* This function empties the user's cart.
*/
function empty() {
    localStorage.clear()
    let parentNode = document.getElementById("your-cart");
    while (parentNode.lastElementChild) {
        parentNode.removeChild(parentNode.lastElementChild);
    }
}

window.onload = setup;