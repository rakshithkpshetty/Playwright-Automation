import { test, expect, Locator } from '@playwright/test';

test('X path access demo', async ({ page }) => {
  // Launch the application URL
  await page.goto('https://www.w3schools.com/html/html_tables.asp');
  await expect(page.locator("//td[normalize-space()='Germany']parent::tr")).toContainText("Maria Anders");

});