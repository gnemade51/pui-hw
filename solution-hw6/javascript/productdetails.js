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

function displayPrice(finalPrice) {
    let priceElement = document.querySelector('#product-details-price');
    priceElement.innerText = "$ " + finalPrice;
}

function onSelectGlazingChange() {
    cinnamon_role.glazing = selectGlazing.options[selectGlazing.selectedIndex].text;
    displayPrice(calcPrice(cinnamon_role));
}

function onSelectPackSizeChange() {
    cinnamon_role.packsize = selectPackSize.options[selectPackSize.selectedIndex].text;
    displayPrice(calcPrice(cinnamon_role));
}

function onClickAddtoCart() {
    let roll = new Product(cinnamon_role.type, cinnamon_role.price, cinnamon_role.glazing, cinnamon_role.packsize);
    roll.glazing = cinnamon_role.glazing;
    roll.packsize = cinnamon_role.packsize;
    cart.push(roll);
    console.log(cart);
    saveToLocalStorage();
}

//Retrieve stored data (from PUI lab 6)
function retrieveFromLocalStorage() {
    const cartString = localStorage.getItem('storedCart');
    const cartArray = JSON.parse(cartString);
    for (const productData of cartArray) {
        cart.push(productData);
    }
    console.log(cartString);
}

//save data to storage
function saveToLocalStorage() {
    const cartString = JSON.stringify(cart);
    localStorage.setItem('storedCart', cartString);
    console.log(cartString);
}

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');
let productname = rollType + ' Cinnamon Roll';
let productprice = rolls[rollType].basePrice;
let productimage = rolls[rollType].imageFile;

let cart = [];

let cinnamon_role = new Product(rollType, productprice, 'Keep Original', '1');

//Update the heading
let selectHeader = document.querySelector('#body-heading-text');
selectHeader.innerText = productname;

// Update the image
let selectImage = document.querySelector('.product-details-image');
selectImage.src = '../assets/products/' + productimage;

//Update the price
let selectPrice = document.querySelector('#product-details-price');
selectPrice.innerText = '$ ' + cinnamon_role.price;

let selectGlazing = document.querySelector('#glazing');
let selectPackSize = document.querySelector('#packsize');

let selectAddtoCart = document.querySelector('.add-to-cart-button');

for(let i in glazingDict){
    var option = document.createElement('option');
    option.text = String(glazingDict[i].name);
    option.value = glazingDict[i].value;
    selectGlazing.add(option);
}

for(let i in packsizeDict){
    var option = document.createElement('option');
    option.text = String(packsizeDict[i].name);
    option.value = packsizeDict[i].value;
    selectPackSize.add(option);
}

selectGlazing.addEventListener('change', onSelectGlazingChange);
selectPackSize.addEventListener('change', onSelectPackSizeChange);
selectAddtoCart.addEventListener('click', onClickAddtoCart);

if (localStorage.getItem('storedCart') != null) {
    retrieveFromLocalStorage();
}