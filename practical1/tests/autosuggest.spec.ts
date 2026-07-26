import { test, expect, Locator } from '@playwright/test';

test("sample dynamic elements", async ({ page }) => {
  await page.goto("https://www.flipkart.com/");

  await page.locator("//input[@placeholder='Search for products, brands and more']").fill("smart");

  // capture all suggestion list items
  const suggested: Locator = page.locator("ul li");

  const count = await suggested.count();
  console.log("No of suggested options:", count);

  // optional: print each suggestion text
  for (let i = 0; i < count; i++) {
    console.log(await suggested.nth(i).innerText());
  }
});