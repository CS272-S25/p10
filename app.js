const ITEMS = getItems().items;

if (!localStorage.getItem("userCart")) {
    localStorage.setItem("userCart", JSON.stringify([]));
}

function setup() {
    //start and end determine which buttons will be set up later in the function, if any
    let start;
    let end;
    if (window.location.href.match('accessories.html') != null) {
        let start = 0;
        let end = 4;
       } else if (window.location.href.match('apparel.html') != null) {
        let start = 4;
        let end = 8;
       } else if (window.location.href.match('shoes.html') != null) {
        let start = 8;
        let end = 12;
       } else if (window.location.href.match('checkout.html')) {
        let start = 0;
        let end = 0;
        setupCart();
       } else {
        let start = 0;
        let end = 0; 
       }
    alert("setting up")
    let cart = JSON.parse(localStorage.getItem("userCart"));

    //this loop sets up buttons
    for(let i = start; i < end; i++) {
        alert("loop start for " + ITEMS[i].id)
        let buttonNode = document.getElementById("add-btn " + ITEMS[i].id);
        alert(document.getElementById("add-btn acc_1").innerText)
        buttonNode.style.backgroundColor = "light";
        buttonNode.addEventListener("click", () => {
            alert("running")
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
}

accessories.onload = setupButtons(0,4); //makes sure the loop only parses through accessory elements
apparel.onload = setupButtons(4,8); //makes sure the loop only parses through apparel elements
shoes.onload = setupButtons(8,12); //makes sure the loop only parses through shoes elements
checkout.onload = setupCart(); //makes sure checkout doesn't load in buttons