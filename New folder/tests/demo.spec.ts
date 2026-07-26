import {test,expect} from  "@playwright/test";

test("Initial testing",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await expect(page).toHaveTitle("Automation Testing Practice");
    await page.getByLabel("Name:")
    await page.locator("#email");
    await page.getByPlaceholder("Enter Phone");
    await page.locator(".form-control");
    await page.locator("#form-check-input").check()
    

})