/*
Layer:
Keywords spezifisch für DIESE Anwendung
Level:
werden in Tests als Testschritte verwendet
Verwendet Intermediate-Level (& Low-Level wenn nötigt)
*/
import { Page, expect } from '@playwright/test';
import { COFFEEMAKER_URL
        ,RECIPES_URL
        ,INGREDIENTS_URL
        ,Recipe
        } from '../helperfile';
import { checkThatWebsiteHasURL
        ,clickRecipesLink
        ,clickIngredientsLink
        ,loadWebsite
        } from './low_level_keywords';
import { addAmountToIngredient
        ,findMissingIngredient
        ,getIngredientsForRecipe
        ,tryToBrewRecipe
        } from './intermediate_level_keywords';



export async function goToCoffeemakerWebsite(page: Page): Promise<void> {
    await loadWebsite(page, COFFEEMAKER_URL);
};

export async function checkThatWebsiteIsCoffeemaker(page: Page): Promise<void> {
    await checkThatWebsiteHasURL(page, COFFEEMAKER_URL);
};

export async function checkThatWebsiteIsRecipes(page: Page): Promise<void> {
    await checkThatWebsiteHasURL(page, RECIPES_URL);
};

export async function checkThatWebsiteIsIngredients(page: Page): Promise<void> {
    await checkThatWebsiteHasURL(page, INGREDIENTS_URL);
};

export async function switchToRecipesTab(page: Page): Promise<void> {
    await clickRecipesLink(page);
};

export async function switchToIngredientsTab(page: Page): Promise<void> {
    await clickIngredientsLink(page);
};

export async function reloadWebsite(page: Page): Promise<void> {
    await page.reload();
};

export async function tryToBrewAmericanoAndRefillMissingIngredients(page: Page) {
    let recipeName = "Americano";
    await switchToRecipesTab(page);
    let recipe: Recipe = await getIngredientsForRecipe(page, recipeName);
    const missingIngredient: [boolean, string] = [false, ""];
    let brewingFailed: boolean = missingIngredient[0];
    let missingIngredientName: string = missingIngredient[1];
    //for each ingredient
    for(let i = 0; i <= 5; i++) {
        await switchToRecipesTab(page);
        await findMissingIngredient(page, missingIngredient);//TODO ändere beschreibung
        await tryToBrewRecipe(page, recipeName);
        brewingFailed = missingIngredient[0];
        missingIngredientName = missingIngredient[1];
        if(brewingFailed /*is true*/) {//brewing failed & missing ingredient was found
            //fill missing ingredient
            let addAmount: number;
            switch(missingIngredientName) {
                case "Sugar": {
                    addAmount = +recipe.sugar;
                    break;
                }
                case "Coffee": {
                    addAmount = +recipe.coffee;
                    break;
                }
                case "Water": {
                    addAmount = +recipe.water;
                    break;
                }
                case "Milk": {
                    addAmount = +recipe.milk;
                    break;
                }
                case "Cocoa": {
                    addAmount = +recipe.cocoa;
                    break;
                }
                default: {
                    addAmount = 0;
                    throw new Error("Undexpected ingredient name");
                }
            };
            await switchToIngredientsTab(page);
            await addAmountToIngredient(page, missingIngredientName, addAmount);
        } else /*missingIngredient[0] is false*/ {//brewing succeeded & therefore no missing ingredient was found
            break;
        };
    };
    expect(brewingFailed, "last brewing should not have failed").toBeFalsy();
};
