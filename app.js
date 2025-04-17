const ITEMS = getItems().items;

if (!localStorage.getItem("userCart")) {
    localStorage.setItem("userCart", JSON.stringify([]));
}

function setup() {
    let cart = JSON.parse(localStorage.getItem("userCart"));
    
    for(let i = 0; i < ITEMS.length; i++) {
        let buttonNode = document.getElementById("add-btn " + ITEMS[i].id);
        buttonNode.style.backgroundColor = "light";
        buttonNode.addEventListener("click", () => {
            if (buttonNode.style.backgroundColor === "light") {
                buttonNode.style.backgroundColor = "grey";
                buttonNode.innerText = "Added"
                localStorage.setItem("userCart", JSON.stringify(favorites));
            } else {
                buttonNode.style.backgroundColor = "light";
            }
            if (cart.includes(ITEMS[i].id)) {
                cart = cart.filter(f => f !== ITEMS[i].id);
            } else {
                cart.push(ITEMS[i]);
            }
    });
    }

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
}

window.onload = setup;