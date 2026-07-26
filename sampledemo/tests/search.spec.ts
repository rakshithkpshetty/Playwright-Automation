import { test, Page ,expect} from "playwright/test";   

test('Login To Saucedemo', async({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.locator("//input[@name='password']").fill("secret_sauce");
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForTimeout(5000);
    await  expect(page).toHaveTitle('Swag Labs');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await expect(page).toBe("Remove");


})
