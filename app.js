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
    let cart = JSON.parse(localStorage.getItem("userCart"));

    //this loop sets up buttons based on the start and end values set earlier
    for(let i = start; i < end; i++) {
        let buttonNode = document.getElementById("add-btn " + ITEMS[i].id);
        if (cart.includes(ITEMS[i].id)) {
            buttonNode.style.backgroundColor = "grey";
            buttonNode.innerText = "Added"
        } else {
            buttonNode.style.backgroundColor = "white";
        }
        buttonNode.addEventListener("click", () => {
            if (buttonNode.style.backgroundColor === "white") {
                buttonNode.style.backgroundColor = "grey";
                buttonNode.innerText = "Added"
            } else {
                buttonNode.style.backgroundColor = "white";
                buttonNode.innerText = "Add To Cart"
            }
            if (cart.includes(ITEMS[i].id)) {
                alert("cart already has " + ITEMS[i].name)
                cart = cart.filter(f => f !== ITEMS[i].id);
            } else {
                alert("adding " + ITEMS[i].name)
                cart.push(ITEMS[i].id);
            }
            localStorage.setItem("userCart", JSON.stringify(cart));
    });
    }

}

/*
* This function loads in the items from the cart into the checkout.
* TODO: make this function work
*/
function setupCart() {
    alert("setting cart")
    let parentNode = document.getElementById("your-cart");
    let cart = JSON.parse(localStorage.getItem("userCart"));
    for (let index = 0; index < 4; index++) {
        alert(cart[index])
        
    }
    alert(cart[0].id)
    alert("c: " + cart.includes(ITEMS[0].id))
    for(let i = 0; i < ITEMS.length; i++) {
        if (cart.includes(ITEMS[i].id)) {
            alert("adding " + ITEMS[i].name + " to checkout")

            const newCardDivNode = document.createElement("div");
            newCardDivNode.className = "card m-2 p-2";

            const newImgNode = document.createElement("img");
            newImgNode.src = ITEMS[i].image;

            const newNameNode = document.createElement("h4");
            newNameNode.innerText = `${ITEMS[i].name}`;
            newNameNode.style.backgroundColor = black;

            const newBrandNode = document.createElement("h5");
            newBrandNode.innerText = `${ITEMS[i].brand}`;
            newBrandNode.style.backgroundColor = black;

            const newPriceNode = document.createElement("h5");
            newPriceNode.innerText = `${ITEMS[i].price}`;
            newPriceNode.style.backgroundColor = black;

            newCardDivNode.appendChild(newImgNode);
            newCardDivNode.appendChild(newNameNode);
            newCardDivNode.appendChild(newBrandNode);
            newCardDivNode.appendChild(newPriceNode);
            parentNode.appendChild(newCardDivNode);
        }
    }
    localStorage.setItem("userCart", JSON.stringify(cart));
}

/*
* This function empties the user's cart
*/
function empty() {
    localStorage.clear()
}

window.onload = setup;