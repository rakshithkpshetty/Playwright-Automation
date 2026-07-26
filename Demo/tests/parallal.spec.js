TypeScript
import { test, expect, chromium, firefox, webkit } from '@playwright/test';

test('Browser Context Architecture Demo', async () => {
    // Step 1: Launch a specific browser engine manually
    const browser = await chromium.launch({ headless: false }); 
    // Alternate examples: 
    // const browser = await firefox.launch({ headless: false });
    // const browser = await webkit.launch({ headless: false });

    // Step 2: Create an isolated browser user profile/session context
    const context = await browser.newContext();

    // Step 3: Create multiple independent pages within the same context
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    // Verify how many pages are currently active in this user profile context
    const openPages = context.pages();
    console.log(`Number of pages created: ${openPages.length}`); // Outputs: 2

    // Step 4: Run operations completely in parallel on separate applications
    await page1.goto('https://playwright.dev');
    await expect(page1).toHaveTitle(/Playwright/);

    await page2.goto('https://www.selenium.dev');
    await expect(page2).toHaveTitle(/Selenium/);

    // Add visual padding timeouts before automated closing sequences execution
    await page1.waitForTimeout(5000);
    await page2.waitForTimeout(5000);

    // Clean up browser environment state
    await browser.close();
});
2. Handling Dynamically Triggered Tabs (tabs.spec.ts)
This file resolves the problem of waiting for a browser page instance triggered dynamically by an application click event via Promise.all().

TypeScript
import { test, expect, chromium } from '@playwright/test';

test('Handle Multi-Tab Navigation', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const parentPage = await context.newPage();

    await parentPage.goto('https://testautomationpractice.blogspot.com/');

    // Crucial step: Wait for the event listeners and the action parallelly
    const [childPage] = await Promise.all([
        context.waitForEvent('page'), // 1. Set up listener for target 'page' event type
        parentPage.locator('button:has-text("New Tab")').click() // 2. Trigger action
    ]);

    // APPROACH 1: Checking and utilizing tabs from the global Context reference array
    const pagesArray = context.pages();
    console.log(`Number of pages created: ${pagesArray.length}`);

    const titleFromIndex0 = await pagesArray[0].title();
    const titleFromIndex1 = await pagesArray[1].title();
    console.log(`Title of parent page (Index 0): ${titleFromIndex0}`);
    console.log(`Title of child page (Index 1): ${titleFromIndex1}`);

    // APPROACH 2: Utilizing direct page variables directly (Recommended for only 2 tabs)
    console.log(`Direct Parent Title: ${await parentPage.title()}`);
    console.log(`Direct Child Title: ${await childPage.title()}`);

    await browser.close();
});
3. Iterating & Handling Multiple Popups (popups.spec.ts)
This program highlights managing independent browser window popups with a loop structure targeting individual pages via title criteria logic.

TypeScript
import { test, expect } from '@playwright/test';

test('Handle Multiple Popup Windows via Iteration', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Concurrently monitor popups event signals and trigger the button action
    await Promise.all([
        page.waitForEvent('popup'), // Popup window events capture assignment setup
        page.locator('#popup-btn-id').click() 
    ]);

    // Fetch tracking list references for all window nodes belonging to context
    const allPopupWindows = context.pages();
    console.log(`Number of pages or windows: ${allPopupWindows.length}`); // Typically returns 3

    // Output individual window location paths to console logs
    console.log(`Parent Window URL: ${allPopupWindows[0].url()}`);
    console.log(`First Popup URL: ${allPopupWindows[1].url()}`);
    console.log(`Second Popup URL: ${allPopupWindows[2].url()}`);

    // Loop through open windows to dynamically act inside specific ones
    for (const pw of allPopupWindows) {
        const title = await pw.title();

        // Target matching window criteria string context
        if (title.includes('Playwright')) {
            // Act specifically within this individual frame context container
            await pw.locator('.get-started-btn').click();
            await pw.waitForTimeout(3000); 
            await pw.close(); // Target isolate close execution step
        }
    }

    await page.waitForTimeout(5000);
    await context.close();
});
4. Authenticated Basic Auth Popups (authenticatedPopup.spec.ts)
This handles browser-level credentials modals that standard automation selectors cannot access.

TypeScript
import { test, expect } from '@playwright/test';

// APPROACH 1: Directly embedding credentials inside the target network URL string context
test('Authenticated Popup - Approach One (URL Injection)', async ({ page }) => {
    // Pattern framework standard configuration format: http://username:password@domain
    await page.goto('http://admin:admin@the-internet.herokuapp.com/basic_auth');
    
    // Validate target access validation landing container
    await expect(page.locator('text=Congratulations')).toBeVisible();
});


// APPROACH 2: Setting up clean context options configuration definitions (Highly Preferred Approach)
test('Authenticated Popup - Approach Two (HTTP Context Credentials Configuration)', async ({ browser }) => {
    // Encapsulate login information parameters securely at context session creation profile layer
    const context = await browser.newContext({
        httpCredentials: {
            username: 'admin',
            password: 'admin'
        }
    });

    const page = await context.newPage();

    // Navigate to plain cleanly specified URL paths without raw authorization injections
    await page.goto('https://the-internet.herokuapp.com/basic_auth');

    // Wait and evaluate confirmation structural component strings states elements safely
    await page.waitForLoadState('load');
    await expect(page.locator('p')).toContainText('Congratulations');

    await context.close();
});