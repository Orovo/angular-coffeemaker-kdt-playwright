/*
Layer:
Keywords die fachspezifsch sind. Hier bezogen auf Coffeemaker allgemein(?)
Level:
werden in Tests als Testschritte verwendet
Verwendet Intermediate-Level (& Low-Level wenn nötigt)
*/
import { Page } from '@playwright/test';
import { INGREDIENT_COCOA
        ,INGREDIENT_COFFEE
        ,INGREDIENT_MILK
        ,INGREDIENT_SUGAR
        ,INGREDIENT_WATER
        ,Recipe
        ,TEST_RECIPE
        } from '../helperfile';
import { checkThatCoffeeLevelIndicatorIsVisible
        ,checkThatButtonRefillCoffeeIsVisible
        ,checkThatWaterLevelIndicatorIsVisible
        ,checkThatButtonRefillWaterIsVisible
        ,checkThatMilkLevelIndicatorIsVisible
        ,checkThatButtonRefillMilkIsVisible
        ,checkThatCocoaLevelIndicatorIsVisible
        ,checkThatButtonRefillCocoaIsVisible
        ,checkThatSugarLevelIndicatorIsVisible
        ,checkThatButtonRefillSugarIsVisible
        ,checkThatCoffeeValueIsZero
        ,checkThatWaterValueIsZero
        ,checkThatMilkValueIsZero
        ,checkThatCocoaValueIsZero
        ,checkThatSugarValueIsZero
        ,checkThatRecipeNameIsVisible
        ,checkThatButtonBrewRecipeIsVisible
        ,checkThatRecipeInputFieldRecipeNameIsVisible
        ,checkThatRecipeInputFieldSugarAmountIsVisible
        ,checkThatRecipeInputFieldCoffeeAmountIsVisible
        ,checkThatRecipeInputFieldWaterAmountIsVisible
        ,checkThatRecipeInputFieldMilkAmountIsVisible
        ,checkThatRecipeInputFieldCocoaAmountIsVisible
        ,checkThatRecipeButtonCreateNewRecipeIsVisible
        ,checkThatCoffeeAmountIsCorrectlyAdded
        ,checkThatCocoaAmountIsCorrectlyAdded
        ,checkThatSugarAmountIsCorrectlyAdded
        ,checkThatWaterAmountIsCorrectlyAdded
        ,checkThatMilkAmountIsCorrectlyAdded
        ,getIngredientsForRecipe
        ,checkThatThereAreNotSufficientIngredientsForRecipe
        ,checkThatThereAreSufficientIngredientsForRecipe
        ,checkThatBrewingWillFail
        ,checkThatBrewingWillSucceed
        ,tryToBrewRecipe
        ,refillIngredientsForRecipeIfNecessary
        ,fillRecipeInputFieldRecipeName
        ,fillRecipeInputFieldSugarAmount
        ,fillRecipeInputFieldCoffeeAmount
        ,fillRecipeInputFieldWaterAmount
        ,fillRecipeInputFieldMilkAmount
        ,fillRecipeInputFieldCocoaAmount
        ,pressButtonCreateNewRecipe
        ,checkThatIngredientLevelsAreAsExpected
        ,getCurrentIngredientAmount
        ,checkThatRecipesAreEqual
        } from '../navigation_layer/intermediate_level_keywords';
import { switchToIngredientsTab
        ,switchToRecipesTab
        } from '../navigation_layer/high_level_keywords';



/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export async function checkThatCoffeeIngredientIsVisible(page: Page): Promise<void> {
    await switchToIngredientsTab(page);
    await checkThatCoffeeLevelIndicatorIsVisible(page);
    await checkThatButtonRefillCoffeeIsVisible(page);
};

export async function checkThatWaterIngredientIsVisible(page: Page): Promise<void> {
    await switchToIngredientsTab(page);
    await checkThatWaterLevelIndicatorIsVisible(page);
    await checkThatButtonRefillWaterIsVisible(page);
};

export async function checkThatMilkIngredientIsVisible(page: Page): Promise<void> {
    await switchToIngredientsTab(page);
    await checkThatMilkLevelIndicatorIsVisible(page);
    await checkThatButtonRefillMilkIsVisible(page);
};

export async function checkThatCocoaIngredientIsVisible(page: Page): Promise<void> {
    await switchToIngredientsTab(page);
    await checkThatCocoaLevelIndicatorIsVisible(page);
    await checkThatButtonRefillCocoaIsVisible(page);
};

export async function checkThatSugarIngredientIsVisible(page: Page): Promise<void> {
    await switchToIngredientsTab(page);
    await checkThatSugarLevelIndicatorIsVisible(page);
    await checkThatButtonRefillSugarIsVisible(page);
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export async function checkThatAllIngredientsAreEmpty(page: Page): Promise<void> {
    await switchToIngredientsTab(page);
    await checkThatCoffeeValueIsZero(page);
    await checkThatWaterValueIsZero(page);
    await checkThatMilkValueIsZero(page);
    await checkThatCocoaValueIsZero(page);
    await checkThatSugarValueIsZero(page);
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

async function checkThatRecipeIsVisible(page: Page, recipeName: string): Promise<void> {
    await switchToRecipesTab(page);
    await checkThatRecipeNameIsVisible(page, recipeName);
    await checkThatButtonBrewRecipeIsVisible(page, recipeName);
};

export async function checkThatRecipeAmericanoIsVisible(page: Page): Promise<void> {
    let recipeName = "Americano";
    await checkThatRecipeIsVisible(page, recipeName);
};

export async function checkThatRecipeEspressoIsVisible(page: Page): Promise<void> {
    let recipeName = "Espresso";
    await checkThatRecipeIsVisible(page, recipeName);
};

export async function checkThatRecipeLatteMacchiatoIsVisible(page: Page): Promise<void> {
    let recipeName = "Latte Macchiato";
    await checkThatRecipeIsVisible(page, recipeName);
};

export async function checkThatRecipeHotChocolateIsVisible(page: Page): Promise<void> {
    let recipeName = "Hot Chocolate";
    await checkThatRecipeIsVisible(page, recipeName);
};

export async function checkThatRecipeTestRecipeIsVisibleAndCorrect(page: Page): Promise<void> {
    let recipe = TEST_RECIPE;
    await checkThatRecipeIsVisible(page, recipe.name);
    await checkThatRecipeIsCorrect(page, recipe);
};

async function checkThatRecipeIsCorrect(page: Page, givenRecipe: Recipe) {
    let foundRecipe: Recipe = await getIngredientsForRecipe(page, givenRecipe.name);
    await checkThatRecipesAreEqual(page, givenRecipe, foundRecipe);
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export async function checkThatFormCreateRecipeIsVisible(page: Page): Promise<void> {
    await switchToRecipesTab(page);
    await checkThatRecipeInputFieldRecipeNameIsVisible(page);
    await checkThatRecipeInputFieldSugarAmountIsVisible(page);
    await checkThatRecipeInputFieldCoffeeAmountIsVisible(page);
    await checkThatRecipeInputFieldWaterAmountIsVisible(page);
    await checkThatRecipeInputFieldMilkAmountIsVisible(page);
    await checkThatRecipeInputFieldCocoaAmountIsVisible(page);
    await checkThatRecipeButtonCreateNewRecipeIsVisible(page);
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export async function checkThatIngredientAmountsAreCorrectlyAdded(page: Page): Promise<void> {
    await switchToIngredientsTab(page);
    let addAmount: number = 10;
    await checkThatCoffeeAmountIsCorrectlyAdded(page, addAmount);
    await checkThatCocoaAmountIsCorrectlyAdded(page, addAmount);
    await checkThatSugarAmountIsCorrectlyAdded(page, addAmount);
    await checkThatWaterAmountIsCorrectlyAdded(page, addAmount);
    await checkThatMilkAmountIsCorrectlyAdded(page, addAmount);
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

async function checkThatIngredientLevelsAreTooLowToBrewRecipe(page: Page, recipeName: string): Promise<void> {
    await switchToRecipesTab(page);
    let recipe: Recipe = await getIngredientsForRecipe(page, recipeName);
    await switchToIngredientsTab(page);
    await checkThatThereAreNotSufficientIngredientsForRecipe(page, recipe);
};

export async function checkThatIngredientLevelsAreTooLowToBrewAmericano(page: Page): Promise<void> {
    let recipeName = "Americano";
    await checkThatIngredientLevelsAreTooLowToBrewRecipe(page, recipeName);
};

export async function checkThatIngredientLevelsAreTooLowToBrewEspresso(page: Page): Promise<void> {
    let recipeName = "Espresso";
    await checkThatIngredientLevelsAreTooLowToBrewRecipe(page, recipeName);
};

export async function checkThatIngredientLevelsAreTooLowToBrewLatteMacchiato(page: Page): Promise<void> {
    let recipeName = "Latte Macchiato";
    await checkThatIngredientLevelsAreTooLowToBrewRecipe(page, recipeName);
};

export async function checkThatIngredientLevelsAreTooLowToBrewHotChocolate(page: Page): Promise<void> {
    let recipeName = "Hot Chocolate";
    await checkThatIngredientLevelsAreTooLowToBrewRecipe(page, recipeName);
};

/*----------------------------------------------------------------------------*/

async function checkErrorMessageForBrewingRecipe(page: Page, recipeName: string): Promise<void> {
    await switchToRecipesTab(page);
    await checkThatBrewingWillFail(page);
    await tryToBrewRecipe(page, recipeName);
};

export async function checkErrorMessageForBrewingAmericano(page: Page): Promise<void> {
    let recipeName = "Americano";
    await checkErrorMessageForBrewingRecipe(page, recipeName);
};

export async function checkErrorMessageForBrewingEspresso(page: Page): Promise<void> {
    let recipeName = "Espresso";
    await checkErrorMessageForBrewingRecipe(page, recipeName);
};

export async function checkErrorMessageForBrewingLatteMacchiato(page: Page): Promise<void> {
    let recipeName = "Latte Macchiato";
    await checkErrorMessageForBrewingRecipe(page, recipeName);
};

export async function checkErrorMessageForBrewingHotChocolate(page: Page): Promise<void> {
    let recipeName = "Hot Chocolate";
    await checkErrorMessageForBrewingRecipe(page, recipeName);
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

async function checkThatIngredientLevelsAreSufficientToBrewRecipeOrStockUp(page: Page, recipeName: string): Promise<void> {
    await switchToRecipesTab(page);
    let recipe: Recipe = await getIngredientsForRecipe(page, recipeName);
    await switchToIngredientsTab(page);
    await refillIngredientsForRecipeIfNecessary(page, recipe);
    await checkThatThereAreSufficientIngredientsForRecipe(page, recipe);
};

export async function checkThatIngredientLevelsAreSufficientToBrewAmericanoOrStockUp(page: Page): Promise<void> {
    let recipeName = "Americano";
    await checkThatIngredientLevelsAreSufficientToBrewRecipeOrStockUp(page, recipeName);
};

export async function checkThatIngredientLevelsAreSufficientToBrewEspressoOrStockUp(page: Page): Promise<void> {
    let recipeName = "Espresso";
    await checkThatIngredientLevelsAreSufficientToBrewRecipeOrStockUp(page, recipeName);
};

export async function checkThatIngredientLevelsAreSufficientToBrewLatteMacchiatoOrStockUp(page: Page): Promise<void> {
    let recipeName = "Latte Macchiato";
    await checkThatIngredientLevelsAreSufficientToBrewRecipeOrStockUp(page, recipeName);
};

export async function checkThatIngredientLevelsAreSufficientToBrewHotChocolateOrStockUp(page: Page): Promise<void> {
    let recipeName = "Hot Chocolate";
    await checkThatIngredientLevelsAreSufficientToBrewRecipeOrStockUp(page, recipeName);
};

/*----------------------------------------------------------------------------*/

async function checkSuccessMessageForBrewingRecipe(page: Page, recipeName: string): Promise<void> {
    await switchToRecipesTab(page);
    await checkThatBrewingWillSucceed(page);
    await tryToBrewRecipe(page, recipeName);
};

export async function checkSuccessMessageForBrewingAmericano(page: Page): Promise<void> {
    let recipeName = "Americano";
    await checkSuccessMessageForBrewingRecipe(page, recipeName);
};

export async function checkSuccessMessageForBrewingEspresso(page: Page): Promise<void> {
    let recipeName = "Espresso";
    await checkSuccessMessageForBrewingRecipe(page, recipeName);
};

export async function checkSuccessMessageForBrewingLatteMacchiato(page: Page): Promise<void> {
    let recipeName = "Latte Macchiato";
    await checkSuccessMessageForBrewingRecipe(page, recipeName);
};

export async function checkSuccessMessageForBrewingHotChocolate(page: Page): Promise<void> {
    let recipeName = "Hot Chocolate";
    await checkSuccessMessageForBrewingRecipe(page, recipeName);
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export async function createTestRecipeWithFormCreateRecipe(page: Page): Promise<void> {
    await switchToRecipesTab(page);
    let recipe = TEST_RECIPE;
    await fillRecipeInputFieldRecipeName(page, recipe.name);
    await fillRecipeInputFieldSugarAmount(page, recipe.sugar);
    await fillRecipeInputFieldCoffeeAmount(page, recipe.coffee);
    await fillRecipeInputFieldWaterAmount(page, recipe.water);
    await fillRecipeInputFieldMilkAmount(page, recipe.milk);
    await fillRecipeInputFieldCocoaAmount(page, recipe.cocoa);
    await pressButtonCreateNewRecipe(page);
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/

export async function getIngredientLevels(page: Page): Promise<string[]> {
    await switchToIngredientsTab(page);
    return [(await getCurrentIngredientAmount(page, INGREDIENT_SUGAR)).toString(),
        (await getCurrentIngredientAmount(page, INGREDIENT_COFFEE)).toString(),
        (await getCurrentIngredientAmount(page, INGREDIENT_WATER)).toString(),
        (await getCurrentIngredientAmount(page, INGREDIENT_MILK)).toString(),
        (await getCurrentIngredientAmount(page, INGREDIENT_COCOA)).toString(),
        ];
};

async function checkThatIngredientLevelsAreAsExpectedAfterBrewingRecipe(page: Page, ingredientLevels: string[], recipeName: string): Promise<void> {
    await switchToRecipesTab(page);
    let recipe: Recipe = await getIngredientsForRecipe(page, recipeName);
    await tryToBrewRecipe(page, recipeName);
    await switchToIngredientsTab(page);
    await checkThatIngredientLevelsAreAsExpected(page, recipe, ingredientLevels);
};

export async function checkThatIngredientLevelsAreAsExpectedAfterBrewingAmericano(page: Page, ingredientLevels: string[]): Promise<void> {
    let recipeName = "Americano";
    await checkThatIngredientLevelsAreAsExpectedAfterBrewingRecipe(page, ingredientLevels, recipeName);
};

export async function checkThatIngredientLevelsAreAsExpectedAfterBrewingEspresso(page: Page, ingredientLevels: string[]): Promise<void> {
    let recipeName = "Espresso";
    await checkThatIngredientLevelsAreAsExpectedAfterBrewingRecipe(page, ingredientLevels, recipeName);
};

export async function checkThatIngredientLevelsAreAsExpectedAfterBrewingLatteMacchiato(page: Page, ingredientLevels: string[]): Promise<void> {
    let recipeName = "Latte Macchiato";
    await checkThatIngredientLevelsAreAsExpectedAfterBrewingRecipe(page, ingredientLevels, recipeName);
};

export async function checkThatIngredientLevelsAreAsExpectedAfterBrewingHotChocolate(page: Page, ingredientLevels: string[]): Promise<void> {
    let recipeName = "Hot Chocolate";
    await checkThatIngredientLevelsAreAsExpectedAfterBrewingRecipe(page, ingredientLevels, recipeName);
};

/*------------------------------------------------------------------------------------------------------------------------------------------------------------*/
