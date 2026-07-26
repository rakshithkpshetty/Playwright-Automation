import {test,expect, Locator} from 'playwright/test';

test("Flipkart demo 1 flow",async ({page})=>{
    await page.goto("https://www.flipkart.com/");
    await expect(page.locator("img[src='https://rukminim2.flixcart.com/fk-p-flap/52/44/image/d2ecfddf891a3922.png?q=90']")).toBeVisible();
    await page.getByTitle("login").click();
    //await page.locator(".c3Bd2c.yXUQVt").click().type("indudunnfubfunfciubfnhuvbcnnuhbdnffciunfcbfcubcufubfbfcfubfccubccubcbfcndhbfsiu");
    await page.getByLabel("Request OTP").click();






})