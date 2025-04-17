const ITEMS = getItems().items;

if (!localStorage.getItem("userCart")) {
    localStorage.setItem("userCart", JSON.stringify([]));
}

function setup() {
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
        }
    }
}

function addToCart(itemID, buttonID) {
    let buttonNode = document.getElementById(buttonID);
    if (buttonNode.style.backgroundColor === "white") {
        buttonNode.style.backgroundColor = "grey";
        buttonNode.innerText = "Added"
    } else {
        buttonNode.style.backgroundColor = "white";
    }

    let cart = JSON.parse(localStorage.getItem("userCart"));
        if (cart.includes(cartDivNode.find(x => x.id === itemID))) {
            favorites = favorites.filter(f => f !== courseData.id);
        } else {
            cart.push(cartDivNode.find(x => x.id === itemID));
            
        }
        localStorage.setItem("favs", JSON.stringify(favorites));
}

window.onload = setup;