import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('Login Test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
});

test('Search Product Test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    console.log('Search Product Executed');
});

test('Add To Cart Test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    console.log('Add To Cart Executed');
});