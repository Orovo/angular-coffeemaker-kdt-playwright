export const COFFEEMAKER_URL = "http://localhost:4200/";
export const RECIPES_URL = "http://localhost:4200/recipes";
export const INGREDIENTS_URL = "http://localhost:4200/ingredients";

export class Ingredient {
    public name: string; public unit: string;//bad practice. set private & accessors needed
    constructor(name: string, unit: string) {
        this.name = name; this.unit = unit;
    };
};
export const INGREDIENT_COCOA: Ingredient = {name: "Cocoa", unit: "g"};
export const INGREDIENT_COFFEE: Ingredient = {name: "Coffee", unit: "g"};
export const INGREDIENT_MILK: Ingredient = {name: "Milk", unit: "ml"};
export const INGREDIENT_SUGAR: Ingredient = {name: "Sugar", unit: "g"};
export const INGREDIENT_WATER: Ingredient = {name: "Water", unit: "ml"};

export const MESSAGE_BREWING_ERROR = "Not enough ingredients";
export const MESSAGE_BREWING_SUCCESS = "Enjoy your freshly brewed";

export class Recipe {
    public name: string; public sugar: string; public coffee: string; public water: string; public milk: string; public cocoa: string;//bad practice. set private & accessors needed
    constructor(name: string, sugar: string, coffee: string, water: string, milk: string, cocoa: string) {
        this.name = name; this.sugar = sugar; this.coffee = coffee; this.water = water; this.milk = milk; this.cocoa = cocoa;
    };
};

export const TEST_RECIPE: Recipe = {name: "Test Recipe", sugar: "0", coffee: "1", water: "2", milk: "3", cocoa: "4"};