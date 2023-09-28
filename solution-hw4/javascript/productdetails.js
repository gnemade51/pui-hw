function calcPrice() {
    let glazingValue = 0;
    let packsizeValue = 1;
    for (let k in glazingDict) {
        if (glazingDict[k].name === cinnamon_role.glazing) {
            glazingValue = glazingDict[k].value;
        }
    }
    //console.log(glazingValue);
    for (let t in packsizeDict) {
        if (packsizeDict[t].name === cinnamon_role.packsize) {
            packsizeValue = packsizeDict[t].value;
        }
    }
    //console.log(packsizeValue);
    let finalPrice = (cinnamon_role.price + glazingValue) * packsizeValue;
    return finalPrice.toFixed(2);
}

function displayPrice(finalPrice){
    let priceElement = document.querySelector('#product-details-price');
    priceElement.innerText = "$ " + finalPrice;
}

function onSelectGlazingChange() {
    //console.log('You selected Glazing ' + this.value);
    //cinnamon_role.glazingValue = parseFloat(this.value);
    cinnamon_role.glazing = selectGlazing.options[selectGlazing.selectedIndex].text;
    displayPrice(calcPrice(cinnamon_role))
  }

function onSelectPackSizeChange() {
    //console.log('You selected PackSize ' + this.value);
    //cinnamon_role.packsizeValue = parseInt(this.value);
    cinnamon_role.packsize = selectPackSize.options[selectPackSize.selectedIndex].text;
    displayPrice(calcPrice(cinnamon_role))
  }

function onClickAddtoCart() {
    let roll = new Product(cinnamon_role.type, cinnamon_role.price, cinnamon_role.glazing, cinnamon_role.packsize)
    roll.glazing = cinnamon_role.glazing;
    roll.packsize = cinnamon_role.packsize
    cart.push(roll)
    console.log(cart)
}

const glazingDict = {
    keep_original: {name:'Keep original', value: 0},
    sugar_milk: {name:'Sugar milk', value: 0},
    vanila_milk: {name:'Vanila milk', value: 0.5},
    double_chocolate: {name:'Double chocolate', value: 1.50}
}

const packsizeDict = {
    one: {name:'1', value: 1},
    three: {name:'3', value: 3},
    six: {name:'6', value: 5},
    twelve: {name:'12', value: 10}
}

class Product {
    constructor(type, price, glazing, packsize){
        this.type = type;
        this.price = price;
        this.glazing = glazing;
        this.packsize = packsize;
    }
};

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
//console.log(params);
const rollType = params.get('roll');
//console.log(rollType);
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
selectPrice.innerText = '$ ' + cinnamon_role.price

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