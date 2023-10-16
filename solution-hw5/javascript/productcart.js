class Product {
    constructor(type, price, glazing, packsize){
        this.type = type;
        this.price = price;
        this.glazing = glazing;
        this.packsize = packsize;
    }
};

const glazingDict = {
    keep_original: {name:'Keep original', value: 0},
    sugar_milk: {name:'Sugar milk', value: 0},
    vanilla_milk: {name:'Vanilla milk', value: 0.5},
    double_chocolate: {name:'Double chocolate', value: 1.50}
};

const packsizeDict = {
    one: {name:'1', value: 1},
    three: {name:'3', value: 3},
    six: {name:'6', value: 5},
    twelve: {name:'12', value: 10}
};

function calcPrice(product) {
    let glazingValue = 0;
    let packsizeValue = 1;
    for (let k in glazingDict) {
        if (glazingDict[k].name === product.glazing) {
            glazingValue = glazingDict[k].value;
        }
    }
    for (let t in packsizeDict) {
        if (packsizeDict[t].name === product.packsize) {
            packsizeValue = packsizeDict[t].value;
        }
    }
    let finalPrice = (product.price + glazingValue) * packsizeValue;
    return finalPrice.toFixed(2);
}

let prod1 = new Product('Original', 2.49, 'Sugar milk', '1');
let prod2 = new Product('Walnut', 3.49, 'Vanilla milk', '12');
let prod3 = new Product('Raisin', 2.99, 'Sugar milk', '3');
let prod4 = new Product('Apple', 3.49, 'Keep original', '3');

let cart = [];
let totalPrice = 0;
cart.push(prod1, prod2, prod3, prod4);

function addProducts(product){
    const template = document.querySelector('#product_cart-card_template');
    const clone = template.content.cloneNode(true);
    

    product.element = clone.querySelector('.product-cart-card');

    const removeButton = product.element.querySelector('.product-cart-card-remove');
    // console.log(removeButton);
    removeButton.addEventListener('click', () => {deleteProduct(product);});

    const productList = document.querySelector('#product-cart-items');
    productList.appendChild(product.element);

    updateProduct(product);
}

function deleteProduct(product) {
    totalPrice -= parseFloat(calcPrice(product));
    updateTotalPrice(totalPrice);
    product.element.remove();
    // cartSet.delete(product);
    cart.splice(cart.indexOf(product), 1);
    console.log(cart)
  }

function updateProduct(product){
    const prodImageElement = product.element.querySelector('.product-cart-card-image');
    const prodNameElement = product.element.querySelector('.product-cart-card-name');
    const prodGlazingElement = product.element.querySelector('.product-cart-card-glazing');
    const prodPacksizeElement = product.element.querySelector('.product-cart-card-packsize');
    const prodTotalPriceElement = product.element.querySelector('.product-cart-card-price');
  
    prodImageElement.src = '../assets/products/' + rolls[product.type].imageFile;
    prodNameElement.innerText = product.type + ' Cinnamon Roll';
    prodGlazingElement.innerText = 'Glazing: ' + product.glazing;
    prodPacksizeElement.innerText = 'Pack Size: ' + product.packsize;
    totalPrice += parseFloat(calcPrice(product));
    prodTotalPriceElement.innerText = '$ ' + calcPrice(product);
    updateTotalPrice(totalPrice);
}

function updateTotalPrice(totalPrice) {
    const finalCartPrice = document.querySelector('.product-cart-checkout-price');
    finalCartPrice.innerText = '$ ' + Math.abs(totalPrice).toFixed(2);
}

updateTotalPrice(totalPrice.toFixed(2));

for (const product of cart) {
    addProducts(product);
}