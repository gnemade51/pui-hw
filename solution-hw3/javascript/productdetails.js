function calcPrice(product) {
    let finalPrice = (product.price + product.glazing) * product.packsize;
    return finalPrice.toFixed(2);
}

function displayPrice(finalPrice){
    let priceElement = document.querySelector('#product-details-price');
    priceElement.innerText = "$ " + finalPrice;
}

function onSelectGlazingChange() {
    console.log('You selected ' + this.value);
    ogCinRoll.glazing = parseFloat(this.value);
    displayPrice(calcPrice(ogCinRoll))
  }

function onSelectPackSizeChange() {
    console.log('You selected ' + this.value);
    ogCinRoll.packsize = parseInt(this.value);
    displayPrice(calcPrice(ogCinRoll))
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
    six: {name:'5', value: 5},
    twelve: {name:'12', value: 10}
}

class Product {
    constructor(name, price, glazing, packsize){
        this.name = name;
        this.price = price;
        this.glazing = glazing;
        this.packsize = packsize;
    }
}

let ogCinRoll = new Product("Original Cinnamon Roll", 2.49, 0, 1);

let selectGlazing = document.querySelector('#glazing');
let selectPackSize = document.querySelector('#packsize');

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
