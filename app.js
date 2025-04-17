const ITEMS = getItems();

const cartDivNode = document.getElementById("cart");

if (!localStorage.getItem("userCart")) {
    localStorage.setItem("userCart", JSON.stringify([]));
}

function setup() {
    let parentNode = document.getElementById("cart");

    for(let i = 0; i < ITEMS.accessories.length; i++) {
        
    }
    for(let i = 0; i < ITEMS.apparel.length; i++) {
        
    }
    for(let i = 0; i < ITEMS.shoes.length; i++) {
        
    }
}

window.onload = setup;