import { test, expect } from '@playwright/test';

// STRATEGY A: Handling Dynamic Elements with XPath (using OR operator)
test('Handle Dynamic Elements using XPath', async ({ page }) => {
    await page.goto('https://getbytext-dynamic-url-demo.com/'); // Replace with actual demo URL used

    // Matches button whether its inner text is "Start" OR "Stop"
    const dynamicButton = page.locator('//button[text()="Stop" or text()="Start"]');

    // Clicking the button 5 times dynamically toggling its state
    for (let i = 0; i < 5; i++) {
        await dynamicButton.click();
        await page.waitForTimeout(1000); // 1 second pause to see the click impact
    }
});

// STRATEGY B: Handling Dynamic Elements with CSS Selectors (using Comma shorthand for OR)
test('Handle Dynamic Elements using CSS Selector', async ({ page }) => {
    await page.goto('https://getbytext-dynamic-url-demo.com/');

    // CSS uses a comma to signify "OR" matching attributes
    const dynamicButtonCSS = page.locator('button[name="start"] , button[name="stop"]');

    for (let i = 0; i < 5; i++) {
        await dynamicButtonCSS.click();
        await page.waitForTimeout(1000);
    }
});

// STRATEGY C: Handling Dynamic Elements using Playwright-specific Locators (Get By Role + Regex)
test('Handle Dynamic Elements using Playwright Locator', async ({ page }) => {
    await page.goto('https://getbytext-dynamic-url-demo.com/');

    // Uses Regular Expression /start|stop/ inside forward slashes to target either text state
    const dynamicButtonPlaywright = page.getByRole('button', { name: /start|stop/ });

    for (let i = 0; i < 5; i++) {
        await dynamicButtonPlaywright.click();
        await page.waitForTimeout(1000);
    }
});