class Product {
    constructor(type, price, glazing, packsize){
        this.type = type;
        this.price = price;
        this.glazing = glazing;
        this.packsize = packsize;
    }
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

function addProducts(product){
    const template = document.querySelector('#product_cart-card_template');
    const clone = template.content.cloneNode(true);
    product.element = clone.querySelector('.product-cart-card');
    const removeButton = product.element.querySelector('.product-cart-card-remove');
    removeButton.addEventListener('click', () => {deleteProduct(product);});
    const productList = document.querySelector('#product-cart-items');
    productList.appendChild(product.element);
    updateProduct(product);
}

function deleteProduct(product) {
    totalPrice -= parseFloat(calcPrice(product));
    updateTotalPrice(totalPrice);
    product.element.remove();
    cart.splice(cart.indexOf(product), 1);
    console.log(cart);
    saveToLocalStorage();
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

function retrieveFromLocalStorage() {
    const cartString = localStorage.getItem('storedCart');
    const cartArray = JSON.parse(cartString);
    for (const productData of cartArray) {
        cart.push(productData);
    }
    console.log(cart);
}

function saveToLocalStorage() {
    const cartString = JSON.stringify(cart);
    localStorage.setItem('storedCart', cartString);
}

let cart = [];
let totalPrice = 0;

updateTotalPrice(totalPrice.toFixed(2));
if (localStorage.getItem('storedCart') != null) {
    retrieveFromLocalStorage();
}

for (const product of cart) {
    addProducts(product);
}