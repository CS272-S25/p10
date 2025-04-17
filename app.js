const ITEMS = getItems().items;

if (!localStorage.getItem("userCart")) {
    localStorage.setItem("userCart", JSON.stringify([]));
}

/*
* This function sets up the accesories, apparel, shoes, and checkout pages.
* For accesories, apparel, and shoes; this function adds event listeners to the buttons,
* allowing them to add items to the cart.
* For checkout; this function calls the setupCart function.
*/
function setup() {
    //start and end determine which buttons will be set up later in the function, if any
    let start;
    let end;
    if (window.location.href.match('accessories.html') != null) {
        start = 0;
        end = 4;
       } else if (window.location.href.match('apparel.html') != null) {
        start = 4;
        end = 8;
       } else if (window.location.href.match('shoes.html') != null) {
        start = 8;
        end = 12;
       } else if (window.location.href.match('checkout.html')) {
        alert("checkout")
        start = 0;
        end = 0;
        setupCart();
       } else {
        start = 0;
        end = 0; 
       }
    alert("setting up")
    let cart = JSON.parse(localStorage.getItem("userCart"));

    //this loop sets up buttons based on the start and end values set earlier
    for(let i = start; i < end; i++) {
        let buttonNode = document.getElementById("add-btn " + ITEMS[i].id);
        buttonNode.style.backgroundColor = "white";
        buttonNode.addEventListener("click", () => {
            if (buttonNode.style.backgroundColor === "white") {
                buttonNode.style.backgroundColor = "grey";
                buttonNode.innerText = "Added"
            } else {
                buttonNode.style.backgroundColor = "white";
                buttonNode.innerText = "Add To Cart"
            }
            if (cart.includes(ITEMS[i].id)) {
                cart = cart.filter(f => f !== ITEMS[i].id);
            } else {
                cart.push(ITEMS[i]);
            }
            localStorage.setItem("userCart", JSON.stringify(cart));
    });
    }

}

/*
* This function loads in the items from the cart into the checkout.
*/
function setupCart() {
    let parentNode = document.getElementById("cart");
    
    for(let i = 0; i < ITEMS.length; i++) {
        let newDivNode = document.createElement("div");
        newDivNode.id = `item-${ITEMS[i].id}`;
        if (cart.includes(ITEMS[i].id)) {
            const newCardDivNode = document.createElement("div");
            newCardDivNode.className = "card m-2 p-2";
            newCardDivNode.style.backgroundColor = "white";

            const newImgNode = document.createElement("img");
            newImgNode.src = ITEMS.accessories[i].image;

            const newNameNode = document.createElement("h4");
            newNameNode.innerText = `${ITEMS[i].name}`;

            const newBrandNode = document.createElement("h5");
            newBrandNode.innerText = `${ITEMS[i].brand}`;

            const newPriceNode = document.createElement("h5");
            newPriceNode.innerText = `${ITEMS[i].price}`;

            newCardDivNode.appendChild(newImgNode);
            newCardDivNode.appendChild(newNameNode);
            newCardDivNode.appendChild(newBrandNode);
            newCardDivNode.appendChild(newPriceNode);
            parentNode.appendChild(newCardDivNode);
        }
    }
    localStorage.setItem("userCart", JSON.stringify(cart));
}

window.onload = setup;