import { test, expect } from '@playwright/test';

test.describe('Playwright Assertions and Timeouts Demo', () => {

    test('Should demonstrate auto-waiting, timeouts, and assertions', async ({ page }) => {
        // 1. Navigate to a sample page
        await page.goto('https://example.com');

        // --- AUTO-WAITING & TIMEOUTS ---
        // Playwright auto-waits for the element to be actionable (visible, attached, stable)
        // You can also pass a custom timeout (in milliseconds) to specific actions
        const submitButton = page.locator('#submit-btn');
        await submitButton.click({ timeout: 5000 }); 

        // --- COMMON ASSERTIONS ---
        // Assertions in Playwright are asynchronous and will retry automatically until they pass or timeout.
        
        // 1. Check visibility
        const successMessage = page.locator('.success-msg');
        await expect(successMessage).toBeVisible({ timeout: 7000 }); // Custom 7s timeout for this assertion

        // 2. Check text content
        await expect(successMessage).toHaveText('Registration Successful!');

        // 3. Check if a checkbox is checked
        const termsCheckbox = page.locator('#terms');
        await expect(termsCheckbox).toBeChecked();

        // 4. Check element attributes or state
        const inputField = page.locator('#username');
        await expect(inputField).toBeEditable();
        await expect(inputField).toHaveAttribute('placeholder', 'Enter your username');

        // 5. Negative assertions (using .not)
        const errorMessage = page.locator('.error-msg');
        await expect(errorMessage).not.toBeVisible();
    });

});