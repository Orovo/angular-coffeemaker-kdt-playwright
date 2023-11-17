/*
Layer:
Keywords spezifisch für DIESE Anwendung
Level:
Implementiert Playwright Befehle
*/
import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { Ingredient } from '../helperfile';



export async function loadWebsite(page: Page, url: string): Promise<void> {
    await page.goto(url);
};

export async function checkThatWebsiteHasURL(page: Page, url: string): Promise<void> {
    await expect(page, "page has not the expected URL").toHaveURL(url);
};

export async function clickRecipesLink(page: Page): Promise<void> {
    let name = "Recipes";
    await page.getByRole('link', { name: name }).click();
};

export async function clickIngredientsLink(page: Page): Promise<void> {
    let name = "Ingredients";
    await page.getByRole('link', { name: name }).click();
};

export async function checkThatRecipeInputFieldIsVisible(page: Page, name: string): Promise<void> {
    let form = await getFormCreateNewRecipe(page);
    await expect(form.locator('id='+name), "input form field '"+name+"' is not visible").toBeVisible();
};

export async function getIngredientLevelIndicator(page: Page, ingredient: Ingredient): Promise<Locator> {
    return page.getByText(new RegExp(ingredient.name + ': [\\d]+' + ingredient.unit));
};

export async function checkThatIngredientLevelIndicatorIsVisible(page: Page, ingredient: Ingredient): Promise<void> {
    await expect(await getIngredientLevelIndicator(page, ingredient), "ingredient level indicator for ingredient '"+ingredient.name+"' is not visible").toBeVisible();
};

export async function checkThatButtonRefillIngredientIsVisible(page: Page, ingredient: Ingredient): Promise<void> {
    await expect(page.locator('id=button-' + ingredient.name), "refill button for ingredient '"+ingredient.name+"' is not visible").toBeVisible();
};

export async function getFormCreateNewRecipe(page: Page): Promise<Locator> {
    return page.locator('id=form-new-recipe');
};

export async function fillRecipeInputField(page: Page, ingredientName: string, value: string): Promise<void> {
    let form = await getFormCreateNewRecipe(page);
    await form.locator('id='+ingredientName).locator('input').fill(value);
};

export async function getButtonBrew(page: Page, name: string): Promise<Locator> {
    let buttonName = "Brew "+name;
    return page.getByRole('button', { name: buttonName });
};

export async function getButtonCreateNewRecipe(page: Page): Promise<Locator> {
    let form = await getFormCreateNewRecipe(page);
    return form.getByRole('button', { name: 'Create new Recipe' });
};