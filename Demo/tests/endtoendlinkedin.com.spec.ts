import { test, expect } from '@playwright/test';

test('linked in', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle(/Google/);
    const input=page.locator("#APjFqb")
    await input.fill("linked in")
    await input.press("Enter");

    await page.locator("#_v3VaarSdJoGO2roP14_LqA0_39")
    await expect(page.getByText("Rakshith")).toBeVisible();
});