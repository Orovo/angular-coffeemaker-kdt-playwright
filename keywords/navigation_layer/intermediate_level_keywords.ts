/*
Layer:
Keywords spezifisch für DIESE Anwendung
Level:
Wird von High-Level verwendet, verwendet Low-Level (wie Playwright)
*/
import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { INGREDIENT_COCOA
        ,INGREDIENT_COFFEE
        ,INGREDIENT_MILK
        ,INGREDIENT_SUGAR
        ,INGREDIENT_WATER
        ,Ingredient
        ,MESSAGE_BREWING_ERROR
        ,MESSAGE_BREWING_SUCCESS
        ,Recipe
        } from '../helperfile';
import { checkThatRecipeInputFieldIsVisible
        ,checkThatIngredientLevelIndicatorIsVisible
        ,checkThatButtonRefillIngredientIsVisible
        ,fillRecipeInputField
        ,getButtonBrew
        ,getButtonCreateNewRecipe
        ,getIngredientLevelIndicator
        } from './low_level_keywords';



/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export async function checkThatCoffeeLevelIndicatorIsVisible(page: Page): Promise<void> {
    let ingredient = INGREDIENT_COFFEE;
    await checkThatIngredientLevelIndicatorIsVisible(page, ingredient);
};

export async function checkThatButtonRefillCoffeeIsVisible(page: Page): Promise<void> {
    let ingredient = INGREDIENT_COFFEE;
    await checkThatButtonRefillIngredientIsVisible(page, ingredient);
};
/*----------------------------------------------------------------------------*/
export async function checkThatWaterLevelIndicatorIsVisible(page: Page): Promise<void> {
    let ingredient = INGREDIENT_WATER;
    await checkThatIngredientLevelIndicatorIsVisible(page, ingredient);
};

export async function checkThatButtonRefillWaterIsVisible(page: Page): Promise<void> {
    let ingredient = INGREDIENT_WATER;
    await checkThatButtonRefillIngredientIsVisible(page, ingredient);
};
/*----------------------------------------------------------------------------*/
export async function checkThatMilkLevelIndicatorIsVisible(page: Page): Promise<void> {
    let ingredient = INGREDIENT_MILK;
    await checkThatIngredientLevelIndicatorIsVisible(page, ingredient);
};

export async function checkThatButtonRefillMilkIsVisible(page: Page): Promise<void> {
    let ingredient = INGREDIENT_MILK;
    await checkThatButtonRefillIngredientIsVisible(page, ingredient);
};
/*----------------------------------------------------------------------------*/
export async function checkThatCocoaLevelIndicatorIsVisible(page: Page): Promise<void> {
    let ingredient = INGREDIENT_COCOA;
    await checkThatIngredientLevelIndicatorIsVisible(page, ingredient);
};

export async function checkThatButtonRefillCocoaIsVisible(page: Page): Promise<void> {
    let ingredient = INGREDIENT_COCOA;
    await checkThatButtonRefillIngredientIsVisible(page, ingredient);
};
/*----------------------------------------------------------------------------*/
export async function checkThatSugarLevelIndicatorIsVisible(page: Page): Promise<void> {
    let ingredient = INGREDIENT_SUGAR;
    await checkThatIngredientLevelIndicatorIsVisible(page, ingredient);
};

export async function checkThatButtonRefillSugarIsVisible(page: Page): Promise<void> {
    let ingredient = INGREDIENT_SUGAR;
    await checkThatButtonRefillIngredientIsVisible(page, ingredient);
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

async function checkThatIngredientValueIsZero(page: Page, ingredient: Ingredient): Promise<void> {
    expect(await getCurrentIngredientAmount(page, ingredient), "ingredient '"+ingredient.name+"' should have value 0").toBe(0);
};

export async function checkThatCoffeeValueIsZero(page: Page): Promise<void> {
    let ingredient = INGREDIENT_COFFEE;
    await checkThatIngredientValueIsZero(page, ingredient);
};

export async function checkThatWaterValueIsZero(page: Page): Promise<void> {
    let ingredient = INGREDIENT_WATER;
    await checkThatIngredientValueIsZero(page, ingredient);
};

export async function checkThatMilkValueIsZero(page: Page): Promise<void> {
    let ingredient = INGREDIENT_MILK;
    await checkThatIngredientValueIsZero(page, ingredient);
};

export async function checkThatCocoaValueIsZero(page: Page): Promise<void> {
    let ingredient = INGREDIENT_COCOA;
    await checkThatIngredientValueIsZero(page, ingredient);
};

export async function checkThatSugarValueIsZero(page: Page): Promise<void> {
    let ingredient = INGREDIENT_SUGAR;
    await checkThatIngredientValueIsZero(page, ingredient);
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export async function checkThatRecipeNameIsVisible(page: Page, name: string): Promise<void> {
    await expect(page.locator('id=recipe-'+name), "recipe with name '"+name+"' is not visible").toBeVisible();
};

export async function checkThatButtonBrewRecipeIsVisible(page: Page, name: string): Promise<void> {
    await expect(await getButtonBrew(page, name), "brew button for recipe '"+name+"' is not visible").toBeVisible();
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export async function checkThatRecipeInputFieldRecipeNameIsVisible(page: Page): Promise<void> {
    await checkThatRecipeInputFieldIsVisible(page, 'name');
};

export async function checkThatRecipeInputFieldSugarAmountIsVisible(page: Page): Promise<void> {
    await checkThatRecipeInputFieldIsVisible(page, 'sugarAmount');
};

export async function checkThatRecipeInputFieldCoffeeAmountIsVisible(page: Page): Promise<void> {
    await checkThatRecipeInputFieldIsVisible(page, 'coffeeAmount');
};

export async function checkThatRecipeInputFieldWaterAmountIsVisible(page: Page): Promise<void> {
    await checkThatRecipeInputFieldIsVisible(page, 'waterAmount');
};

export async function checkThatRecipeInputFieldMilkAmountIsVisible(page: Page): Promise<void> {
    await checkThatRecipeInputFieldIsVisible(page, 'milkAmount');
};

export async function checkThatRecipeInputFieldCocoaAmountIsVisible(page: Page): Promise<void> {
    await checkThatRecipeInputFieldIsVisible(page, 'cocoaAmount');
};

export async function checkThatRecipeButtonCreateNewRecipeIsVisible(page: Page): Promise<void> {
    let form = page.locator('id=form-new-recipe');
    await expect(form.getByRole('button', { name: 'Create new Recipe' }), "button 'Create new Recipe' is not visible").toBeVisible();
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export async function getCurrentIngredientAmount(page: Page, ingredient: Ingredient): Promise<number> {
    let text = await (await getIngredientLevelIndicator(page, ingredient)).innerText();
    return +text.split(' ')[1].split(ingredient.unit)[0];
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//%%
export async function addAmountToIngredient(page: Page, ingredientName: string, addAmount: number): Promise<void> {
    await page.locator('id=amount-' + ingredientName).fill(addAmount.toString());
    await page.locator('id=button-' + ingredientName).click();
};

async function checkThatIngredientAmountIsCorrectlyAdded(page: Page, addAmount: number, ingredient: Ingredient): Promise<void> {
    let oldAmount: number = await getCurrentIngredientAmount(page, ingredient);
    await addAmountToIngredient(page, ingredient.name, addAmount);
    expect(await getCurrentIngredientAmount(page, ingredient), "current amount for ingredient '"+ingredient.name+"' is not as expected").toBe(oldAmount + addAmount);
};

export async function checkThatCoffeeAmountIsCorrectlyAdded(page: Page, addAmount: number): Promise<void> {
    let ingredient = INGREDIENT_COFFEE;
    await checkThatIngredientAmountIsCorrectlyAdded(page, addAmount, ingredient);
};

export async function checkThatCocoaAmountIsCorrectlyAdded(page: Page, addAmount: number): Promise<void> {
    let ingredient = INGREDIENT_COCOA;
    await checkThatIngredientAmountIsCorrectlyAdded(page, addAmount, ingredient);
};

export async function checkThatSugarAmountIsCorrectlyAdded(page: Page, addAmount: number): Promise<void> {
    let ingredient = INGREDIENT_SUGAR;
    await checkThatIngredientAmountIsCorrectlyAdded(page, addAmount, ingredient);
};

export async function checkThatWaterAmountIsCorrectlyAdded(page: Page, addAmount: number): Promise<void> {
    let ingredient = INGREDIENT_WATER;
    await checkThatIngredientAmountIsCorrectlyAdded(page, addAmount, ingredient);
};

export async function checkThatMilkAmountIsCorrectlyAdded(page: Page, addAmount: number): Promise<void> {
    let ingredient = INGREDIENT_MILK;
    await checkThatIngredientAmountIsCorrectlyAdded(page, addAmount, ingredient);
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export async function getIngredientsForRecipe(page: Page, recipeName: string): Promise<Recipe> {
    let recipe: Locator = page.locator('id=recipe-'+recipeName);
    let sugar: string = await recipe.locator('tr').nth(0).locator('td').nth(1).textContent().then();
    let coffee: string = await recipe.locator('tr').nth(1).locator('td').nth(1).textContent().then();
    let water: string = await recipe.locator('tr').nth(2).locator('td').nth(1).textContent().then();
    let milk: string = await recipe.locator('tr').nth(3).locator('td').nth(1).textContent().then();
    let cocoa: string = await recipe.locator('tr').nth(4).locator('td').nth(1).textContent().then();
    return new Recipe(recipeName, sugar, coffee, water, milk, cocoa);
};

export async function checkThatThereAreNotSufficientIngredientsForRecipe(page: Page, recipe: Recipe): Promise<void> {
    const currentCocoa = await getCurrentIngredientAmount(page, INGREDIENT_COCOA);
    const currentCoffee = await getCurrentIngredientAmount(page, INGREDIENT_COFFEE);
    const currentMilk = await getCurrentIngredientAmount(page, INGREDIENT_MILK);
    const currentSugar = await getCurrentIngredientAmount(page, INGREDIENT_SUGAR);
    const currentWater = await getCurrentIngredientAmount(page, INGREDIENT_WATER);
    if(+recipe.cocoa == 0) {
        expect(currentCocoa, "current cocoa amount should be "+recipe.cocoa).toBe(+recipe.cocoa);
    } else {
        expect(currentCocoa, "current cocoa amount should be less than "+recipe.cocoa).toBeLessThan(+recipe.cocoa);
    };
    if(+recipe.coffee == 0) {
        expect(currentCoffee, "current coffee amount should be "+recipe.coffee).toBe(+recipe.coffee);
    } else {
        expect(currentCoffee, "current coffee amount should be less than "+recipe.coffee).toBeLessThan(+recipe.coffee);
    };
    if(+recipe.milk == 0) {
        expect(currentMilk, "current milk amount should be "+recipe.milk).toBe(+recipe.milk);
    } else {
        expect(currentMilk, "current milk amount should be less than "+recipe.milk).toBeLessThan(+recipe.milk);
    };
    if(+recipe.sugar == 0) {
        expect(currentSugar, "current sugar amount should be "+recipe.sugar).toBe(+recipe.sugar);
    } else {
        expect(currentSugar, "current sugar amount should be less than "+recipe.sugar).toBeLessThan(+recipe.sugar);
    };
    if(+recipe.water == 0) {
        expect(currentWater, "current water amount should be "+recipe.water).toBe(+recipe.water);
    } else {
        expect(currentWater, "current water amount should be less than "+recipe.water).toBeLessThan(+recipe.water);
    };
};

export async function checkThatThereAreSufficientIngredientsForRecipe(page: Page, recipe: Recipe): Promise<void> {
    expect(await getCurrentIngredientAmount(page, INGREDIENT_COCOA), "current cocoa amount should be greater than or equal to "+recipe.cocoa).toBeGreaterThanOrEqual(+recipe.cocoa);
    expect(await getCurrentIngredientAmount(page, INGREDIENT_COFFEE), "current coffee amount should be greater than or equal to "+recipe.coffee).toBeGreaterThanOrEqual(+recipe.coffee);
    expect(await getCurrentIngredientAmount(page, INGREDIENT_MILK), "current milk amount should be greater than or equal to "+recipe.milk).toBeGreaterThanOrEqual(+recipe.milk);
    expect(await getCurrentIngredientAmount(page, INGREDIENT_SUGAR), "current sugar amount should be greater than or equal to "+recipe.sugar).toBeGreaterThanOrEqual(+recipe.sugar);
    expect(await getCurrentIngredientAmount(page, INGREDIENT_WATER), "current water amount should be greater than or equal to "+recipe.water).toBeGreaterThanOrEqual(+recipe.water);
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export async function checkThatBrewingWillFail(page: Page): Promise<void> {
    page.once('dialog', dialog => {
        expect(dialog.message(), "dialog message should contain '"+MESSAGE_BREWING_ERROR+"' to identify as a brewing error message").toContain(MESSAGE_BREWING_ERROR);
        dialog.accept();
    });
};

export async function checkThatBrewingWillSucceed(page: Page): Promise<void> {
    page.once('dialog', dialog => {
        expect(dialog.message(), "dialog message should contain '"+MESSAGE_BREWING_SUCCESS+"' to identify as a brewing success message").toContain(MESSAGE_BREWING_SUCCESS);
        dialog.accept();
    });
};

export async function tryToBrewRecipe(page: Page, recipeName: string): Promise<void> {
    (await getButtonBrew(page, recipeName)).click();
    await page.waitForTimeout(3000);//apparently no other way to stop the test from finishing before the handler did it's thing
};

export async function refillIngredientsForRecipeIfNecessary(page: Page, recipe: Recipe): Promise<void> {
    let currentCoffeeAmount: number = await getCurrentIngredientAmount(page, INGREDIENT_COFFEE).then();
    let currentCocoaAmount: number = await getCurrentIngredientAmount(page, INGREDIENT_COCOA).then();
    let currentSugarAmount: number = await getCurrentIngredientAmount(page, INGREDIENT_SUGAR).then();
    let currentMilkAmount: number = await getCurrentIngredientAmount(page, INGREDIENT_MILK).then();
    let currentWaterAmount: number = await getCurrentIngredientAmount(page, INGREDIENT_WATER).then();
    let coffeeRefillAmount: number = +recipe.coffee-currentCoffeeAmount;
    let cocoaRefillAmount: number = +recipe.cocoa-currentCocoaAmount;
    let sugarRefillAmount: number = +recipe.sugar-currentSugarAmount;
    let milkRefillAmount: number = +recipe.milk-currentMilkAmount;
    let waterRefillAmount: number = +recipe.water-currentWaterAmount;
    if(coffeeRefillAmount > 0) { await addAmountToIngredient(page, 'Coffee', coffeeRefillAmount); };
    if(cocoaRefillAmount > 0) { await addAmountToIngredient(page, 'Cocoa', cocoaRefillAmount); };
    if(sugarRefillAmount > 0) { await addAmountToIngredient(page, 'Sugar', sugarRefillAmount); };
    if(milkRefillAmount > 0) { await addAmountToIngredient(page, 'Milk', milkRefillAmount); };
    if(waterRefillAmount > 0) { await addAmountToIngredient(page, 'Water', waterRefillAmount); };
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export async function fillRecipeInputFieldRecipeName(page: Page, value: string): Promise<void> {
    await fillRecipeInputField(page, 'name', value);
};

export async function fillRecipeInputFieldSugarAmount(page: Page, value: string): Promise<void> {
    await fillRecipeInputField(page, 'sugarAmount', value);
};

export async function fillRecipeInputFieldCoffeeAmount(page: Page, value: string): Promise<void> {
    await fillRecipeInputField(page, 'coffeeAmount', value);
};

export async function fillRecipeInputFieldWaterAmount(page: Page, value: string): Promise<void> {
    await fillRecipeInputField(page, 'waterAmount', value);
};

export async function fillRecipeInputFieldMilkAmount(page: Page, value: string): Promise<void> {
    await fillRecipeInputField(page, 'milkAmount', value);
};

export async function fillRecipeInputFieldCocoaAmount(page: Page, value: string): Promise<void> {
    await fillRecipeInputField(page, 'cocoaAmount', value);
};

export async function pressButtonCreateNewRecipe(page: Page): Promise<void> {
    (await getButtonCreateNewRecipe(page)).click()
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export async function checkThatIngredientLevelsAreAsExpected(page: Page, usedRecipe: Recipe, previousIngredientLevels: string[]): Promise<void> {
    expect(await getCurrentIngredientAmount(page, INGREDIENT_SUGAR), "current sugar amount is not as expected").toBe((+(previousIngredientLevels[0]))-(+usedRecipe.sugar));
    expect(await getCurrentIngredientAmount(page, INGREDIENT_COFFEE), "current coffee amount is not as expected").toBe((+(previousIngredientLevels[1]))-(+usedRecipe.coffee));
    expect(await getCurrentIngredientAmount(page, INGREDIENT_WATER), "current water amount is not as expected").toBe((+(previousIngredientLevels[2]))-(+usedRecipe.water));
    expect(await getCurrentIngredientAmount(page, INGREDIENT_MILK), "current milk amount is not as expected").toBe((+(previousIngredientLevels[3]))-(+usedRecipe.milk));
    expect(await getCurrentIngredientAmount(page, INGREDIENT_COCOA), "current cocoa amount is not as expected").toBe((+(previousIngredientLevels[4]))-(+usedRecipe.cocoa));
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export async function findMissingIngredient(page: Page, missingIngredient: [boolean, string]): Promise<void> {
    // page.on('dialog', dialog => {
    page.once('dialog', dialog => {
        missingIngredient[0] = false;
        missingIngredient[1] = "";
        if(dialog.message().includes(MESSAGE_BREWING_ERROR)) {
            missingIngredient[0] = true;
            missingIngredient[1] = dialog.message().split(' ')[5];
        }
        dialog.accept();
    });
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export async function checkThatRecipesAreEqual(page: Page, givenRecipe: Recipe, foundRecipe: Recipe): Promise<void> {
    expect(foundRecipe.cocoa, "recipe cocoa amount is not as expected").toBe(givenRecipe.cocoa);
    expect(foundRecipe.coffee, "recipe coffee amount is not as expected").toBe(givenRecipe.coffee);
    expect(foundRecipe.milk, "recipe milk amount is not as expected").toBe(givenRecipe.milk);
    expect(foundRecipe.name, "recipe name is not as expected").toBe(givenRecipe.name);
    expect(foundRecipe.sugar, "recipe sugar amount is not as expected").toBe(givenRecipe.sugar);
    expect(foundRecipe.water, "recipe water amount is not as expected").toBe(givenRecipe.water);
};