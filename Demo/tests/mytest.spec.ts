import { test, expect } from '@playwright/test';

test('Verify page title', async ({ page }) => {
    // Open a website URL
    await page.goto('https://www.google.com');
    
    // Optional: Capture and print the title
    const pageTitle = await page.title();
    console.log('Page title is:', pageTitle);
    
    // Add validation assertion
    await expect(page).toHaveTitle('Google');
    await
});