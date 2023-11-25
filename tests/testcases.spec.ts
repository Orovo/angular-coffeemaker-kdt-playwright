import { expect, test } from '@playwright/test';
import { goToCoffeemakerWebsite
        ,checkThatWebsiteIsCoffeemaker
        ,switchToRecipesTab
        ,switchToIngredientsTab
        ,checkThatWebsiteIsRecipes
        ,checkThatWebsiteIsIngredients
        ,reloadWebsite
        ,tryToBrewAmericanoAndRefillMissingIngredients
        } from '../keywords/navigation_layer/high_level_keywords';
import { checkThatCoffeeIngredientIsVisible
        ,checkThatWaterIngredientIsVisible
        ,checkThatMilkIngredientIsVisible
        ,checkThatCocoaIngredientIsVisible
        ,checkThatSugarIngredientIsVisible
        ,checkThatAllIngredientsAreEmpty
        ,checkThatRecipeAmericanoIsVisible
        ,checkThatRecipeEspressoIsVisible
        ,checkThatRecipeLatteMacchiatoIsVisible
        ,checkThatRecipeHotChocolateIsVisible
        ,checkThatFormCreateRecipeIsVisible 
        ,checkThatIngredientAmountsAreCorrectlyAdded
        ,checkThatIngredientLevelsAreTooLowToBrewAmericano
        ,checkForErrorMessageForBrewingAmericano
        ,checkThatIngredientLevelsAreTooLowToBrewEspresso
        ,checkForErrorMessageForBrewingEspresso
        ,checkThatIngredientLevelsAreTooLowToBrewLatteMacchiato
        ,checkForErrorMessageForBrewingLatteMacchiato
        ,checkThatIngredientLevelsAreTooLowToBrewHotChocolate
        ,checkForErrorMessageForBrewingHotChocolate
        ,checkThatIngredientLevelsAreSufficientToBrewAmericanoOrStockUp
        ,checkForSuccessMessageForBrewingAmericano
        ,checkThatIngredientLevelsAreSufficientToBrewEspressoOrStockUp
        ,checkForSuccessMessageForBrewingEspresso
        ,checkThatIngredientLevelsAreSufficientToBrewLatteMacchiatoOrStockUp
        ,checkForSuccessMessageForBrewingLatteMacchiato
        ,checkThatIngredientLevelsAreSufficientToBrewHotChocolateOrStockUp
        ,checkForSuccessMessageForBrewingHotChocolate
        ,createTestRecipeWithFormCreateRecipe
        ,checkThatRecipeTestRecipeIsVisibleAndCorrect
        ,getIngredientLevels
        ,checkThatIngredientLevelsAreAsExpectedAfterBrewingAmericano
        ,checkThatIngredientLevelsAreAsExpectedAfterBrewingEspresso
        ,checkThatIngredientLevelsAreAsExpectedAfterBrewingLatteMacchiato
        ,checkThatIngredientLevelsAreAsExpectedAfterBrewingHotChocolate
        } from '../keywords/domain_layer/high_level_keywords';



test.afterEach(async ({ page }) => {
    await page.waitForTimeout(1000);
    page.close();
});


test('Test 01: Check that recipe and ingredient page are avaliable.', async ({ page }) => {
    await goToCoffeemakerWebsite(page);
    await checkThatWebsiteIsCoffeemaker(page);
    await switchToRecipesTab(page);
    await checkThatWebsiteIsRecipes(page);
    await switchToIngredientsTab(page);
    await checkThatWebsiteIsIngredients(page);
});

test('Test 02: Check that all ingredients are shown.', async ({ page }) => {
    await goToCoffeemakerWebsite(page);
    await checkThatCoffeeIngredientIsVisible(page);
    await checkThatWaterIngredientIsVisible(page);
    await checkThatMilkIngredientIsVisible(page);
    await checkThatCocoaIngredientIsVisible(page);
    await checkThatSugarIngredientIsVisible(page);
});

test('Test 03: Check that all ingredients are empty.', async ({ page }) => {
    await goToCoffeemakerWebsite(page);
    await checkThatAllIngredientsAreEmpty(page);
});

test('Test 04: Check that default recepies are shown.', async ({ page }) => {
    await goToCoffeemakerWebsite(page);
    await checkThatRecipeAmericanoIsVisible(page);
    await checkThatRecipeEspressoIsVisible(page);
    await checkThatRecipeLatteMacchiatoIsVisible(page);
    await checkThatRecipeHotChocolateIsVisible(page);
});

test('Test 05: Check that recipe input form is shown.', async ({ page }) => {
    await goToCoffeemakerWebsite(page);
    await checkThatFormCreateRecipeIsVisible(page);
});

test('Test 06: Check that correct ingredient amounts are added.', async ({ page }) => {
    await goToCoffeemakerWebsite(page);
    await checkThatIngredientAmountsAreCorrectlyAdded(page);
});

test('Test 07: Check that success message is shown when brewing with sufficient ingredients.', async ({ page }) => {
    await goToCoffeemakerWebsite(page);
    await checkThatIngredientLevelsAreSufficientToBrewAmericanoOrStockUp(page);
    await checkForSuccessMessageForBrewingAmericano(page);
    await checkThatIngredientLevelsAreSufficientToBrewEspressoOrStockUp(page);
    await checkForSuccessMessageForBrewingEspresso(page);
    await checkThatIngredientLevelsAreSufficientToBrewLatteMacchiatoOrStockUp(page);
    await checkForSuccessMessageForBrewingLatteMacchiato(page);
    await checkThatIngredientLevelsAreSufficientToBrewHotChocolateOrStockUp(page);
    await checkForSuccessMessageForBrewingHotChocolate(page);
});

test('Test 08: Check that error message is shown when brewing witout sufficient ingredients.', async ({ page }) => {
    await goToCoffeemakerWebsite(page);
    await checkThatIngredientLevelsAreTooLowToBrewAmericano(page);
    await checkForErrorMessageForBrewingAmericano(page);
    await checkThatIngredientLevelsAreTooLowToBrewEspresso(page);
    await checkForErrorMessageForBrewingEspresso(page);
    await checkThatIngredientLevelsAreTooLowToBrewLatteMacchiato(page);
    await checkForErrorMessageForBrewingLatteMacchiato(page);
    await checkThatIngredientLevelsAreTooLowToBrewHotChocolate(page);
    await checkForErrorMessageForBrewingHotChocolate(page);
});

test('Test 09: Add recipe and check that it has been added to the list.', async ({ page }) => {
    await goToCoffeemakerWebsite(page);
    await createTestRecipeWithFormCreateRecipe(page);
    await reloadWebsite(page);
    await checkThatRecipeTestRecipeIsVisibleAndCorrect(page);
});

test('Test 10: Ckeck that the correct ingredient amounts have been removed after brewing.', async ({ page }) => {
    await goToCoffeemakerWebsite(page);
    await checkThatIngredientLevelsAreSufficientToBrewAmericanoOrStockUp(page);
    let ingredientLevels = await getIngredientLevels(page);
    await checkThatIngredientLevelsAreAsExpectedAfterBrewingAmericano(page, ingredientLevels);
    await checkThatIngredientLevelsAreSufficientToBrewEspressoOrStockUp(page);
    ingredientLevels = await getIngredientLevels(page);
    await checkThatIngredientLevelsAreAsExpectedAfterBrewingEspresso(page, ingredientLevels);
    await checkThatIngredientLevelsAreSufficientToBrewLatteMacchiatoOrStockUp(page);
    ingredientLevels = await getIngredientLevels(page);
    await checkThatIngredientLevelsAreAsExpectedAfterBrewingLatteMacchiato(page, ingredientLevels);
    await checkThatIngredientLevelsAreSufficientToBrewHotChocolateOrStockUp(page);
    ingredientLevels = await getIngredientLevels(page);
    await checkThatIngredientLevelsAreAsExpectedAfterBrewingHotChocolate(page, ingredientLevels);
});

test('Test 11: Brew Americano whilst refilling missing ingredients.', async ({ page }) => {
    await goToCoffeemakerWebsite(page);
    await tryToBrewAmericanoAndRefillMissingIngredients(page);
});


/*
test('testbeschreibung', async ({ page }) => {
    
});
//*/
