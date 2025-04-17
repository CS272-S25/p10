const ITEMS = getItems().items;

if (!localStorage.getItem("userCart")) {
    localStorage.setItem("userCart", JSON.stringify([]));
}

function setup() {
    for(let i = 0; i < ITEMS.length; i++) {
        
    }

    let parentNode = document.getElementById("cart");
    let cart = JSON.parse(localStorage.getItem("userCart"));

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
}

function addToCart(itemID) {  
    let buttonNode = document.getElementById("add-btn " + itemID);
    alert("running add to cart" + buttonNode.style.backgroundColor)
    if (buttonNode.style.backgroundColor === "light") {
        buttonNode.style.backgroundColor = "grey";
        buttonNode.innerText = "Added"
    } else {
        buttonNode.style.backgroundColor = "light";
    }

    let cart = JSON.parse(localStorage.getItem("userCart"));
    if (cart.includes(itemID)) {
        cart = cart.filter(f => f !== courseData.id);
    } else {
        cart.push(ITEMS.find(x => x.id === itemID));
    }
    localStorage.setItem("userCart", JSON.stringify(favorites));
    setup();
}

window.onload = setup;