import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Ingredient, Id } from '../models/Ingredient';
import { Recipe } from '../models/Recipe';

const NONE_STRING: string = "None";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class MachineService {
  ingredientsUrl: string = 'http://localhost:3000/ingredients';
  recipesUrl: string = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) {
  }

  /**
   *  R E C I P E S 
   */

  /* Get all existing recipes */
  getRecipes(): Observable<Recipe[]> {
    ///** Orginalversion *//**
    return this.http.get<Recipe[]>(this.recipesUrl);
    //*/
    /** Fehler 1 *//**
    return this.http.get<Recipe[]>(this.recipesUrl+"s");
    //*/
  }

  /* Add given recipe to DB table of existing ones */
  async addRecipe(enteredRecipe: Recipe): Promise<void> {
    this.http.post<Recipe>(this.recipesUrl, enteredRecipe, httpOptions)
      .subscribe();
  }

  /* Consume ingredients of given recipe, if all are sufficient, otherwise alert */
  async brewRecipe(recipe: Recipe): Promise<void> {
    let missingIngredient: string = await this.enoughIngredientsAvailable(recipe);

    ///** Orginalversion *//**
    if (missingIngredient != NONE_STRING) {
    //*/
    /** Fehler 3 *//**
    if (missingIngredient == NONE_STRING) {
    //*/
      alert("Not enough ingredients! Need more " + missingIngredient);
    } else {
      this.useNeededIngredients(recipe);
      alert("☕ Enjoy your freshly brewed " + recipe.name + "! ☕");
    }
  }

  /* Return name of insufficient ingredient, if there is one */
  async enoughIngredientsAvailable(recipe: Recipe): Promise<string> {
    ///** Orginalversion *//**
    let result: string = NONE_STRING;
    //*/
    /** Fehler 4 *//**
    let result: string = "";
    //*/

    let currentCoffee: Ingredient = await this.getIngredientById(Id.coffee);
    if (currentCoffee.amount < recipe.coffeeAmount) return currentCoffee.name;
    let currentWater: Ingredient = await this.getIngredientById(Id.water);
    if (currentWater.amount < recipe.waterAmount) return currentWater.name;
    let currentMilk: Ingredient = await this.getIngredientById(Id.milk);
    if (currentMilk.amount < recipe.milkAmount) return currentMilk.name;
    let currentCocoa: Ingredient = await this.getIngredientById(Id.cocoa);
    if (currentCocoa.amount < recipe.cocoaAmount) return currentCocoa.name;
    let currentSugar: Ingredient = await this.getIngredientById(Id.sugar);
    if (currentSugar.amount < recipe.sugarAmount) return currentSugar.name;

    return result;
  }

  /* Reduce amounts of all ingredients by values of given recipe */
  async useNeededIngredients(recipe: Recipe): Promise<void> {
    let oldCoffee: Ingredient = await this.getIngredientById(Id.coffee);
    this.useIngredient(oldCoffee, recipe.coffeeAmount);
    let oldWater: Ingredient = await this.getIngredientById(Id.water);
    this.useIngredient(oldWater, recipe.waterAmount);
    let oldMilk: Ingredient = await this.getIngredientById(Id.milk);
    this.useIngredient(oldMilk, recipe.milkAmount);
    let oldCocoa: Ingredient = await this.getIngredientById(Id.cocoa);
    this.useIngredient(oldCocoa, recipe.cocoaAmount);
    let oldSugar: Ingredient = await this.getIngredientById(Id.sugar);
    this.useIngredient(oldSugar, recipe.sugarAmount);
  }

  /**
   * I N G R E D I E N T S 
   */

  /* Get current state of one ingredient by given ID */
  async getIngredientById(ingredientId: Id): Promise<Ingredient> {
    const url = `${this.ingredientsUrl}/${ingredientId}`;
    const ingredient: Ingredient = await this.http.get<Ingredient>(url).toPromise();
    return ingredient;
  }

  /* Consume given amount of given ingredient from the machine */
  useIngredient(ingredient: Ingredient, usedAmount: number): void {
    let ingUrl: string = `${this.ingredientsUrl}/${ingredient.id}`;
    let amountJson = {
      ///** Orginalversion *//**
      "amount": ingredient.amount -= usedAmount
      //*/
      /** Fehler 5 *//**
      "amount": ingredient.amount += usedAmount
      //*/
    }
    this.http.patch(ingUrl, amountJson, httpOptions)
      .subscribe();
  }

  /* Add given amount of given ingredient into the machine */
  refillIngredient(ingredient: Ingredient, refillAmount: number): void {
    let ingUrl: string = `${this.ingredientsUrl}/${ingredient.id}`;
    let amountJson = {
      ///** Orginalversion *//**
      "amount": ingredient.amount += refillAmount
      //*/
      /** Fehler 7 *//**
      "amount": ingredient.amount -= refillAmount
      //*/
    }
    this.http.patch(ingUrl, amountJson, httpOptions)
      .subscribe();
  }

  /* Get list of all ingredients */
  getIngredients(): Observable<Ingredient[]> {
    ///** Orginalversion *//**
    return this.http.get<Ingredient[]>(this.ingredientsUrl);
    //*/
    /** Fehler 6 *//**
    return this.http.get<Ingredient[]>(this.ingredientsUrl+"s");
    //*/
  }
}
