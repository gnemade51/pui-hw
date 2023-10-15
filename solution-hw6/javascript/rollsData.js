const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
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