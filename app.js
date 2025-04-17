const ITEMS = getItems().items;

if (!localStorage.getItem("userCart")) {
    localStorage.setItem("userCart", JSON.stringify([]));
}

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
        alert("shoes")
        start = 8;
        end = 12;
       } else if (window.location.href.match('checkout.html')) {
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
        alert("loop start for " + ITEMS[i].id)
        let buttonNode = document.getElementById("add-btn " + ITEMS[i].id);
        alert(document.getElementById("add-btn " + ITEMS[i].id).innerText)
        buttonNode.style.backgroundColor = "light";
        alert(document.getElementById("add-btn " + ITEMS[i].id).style.backgroundColor)
        buttonNode.addEventListener("click", () => {
            alert("running")
            if (buttonNode.style.backgroundColor === "light") {
                buttonNode.style.backgroundColor = "grey";
                buttonNode.innerText = "Added"
            } else {
                buttonNode.style.backgroundColor = "light";
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