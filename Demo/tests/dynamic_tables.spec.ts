
// Here is the complete code for each of the test scenarios implemented throughout this video tutorial session. The code is written in Playwright with TypeScript and covers handling dynamic tables as well as different operations on a paginated web table.

// 1. Dynamic Table Automation (dynamic-table.spec.ts)
// This script locates a process row dynamically (even if the row sequence changes on refresh), finds the column containing the CPU percentage text (%) dynamically, and validates it against the text displayed in an external verification summary box (yellow box).


import { test, expect, Locator } from '@playwright/test';

test('verify chrome CPU load in dynamic table', async ({ page }) => {
    // Launching the test automation practice application
    await page.goto('https://testautomationpractice.blogspot.com/');

    // 1. Capture the entire table body and verify visibility
    const table: Locator = page.locator('table.table tbody'); 
    await expect(table).toBeVisible();

    // 2. Identify and assert total number of rows
    const rows: Locator[] = await table.locator('tr').all();
    console.log(`number of rows in a table: ${rows.length}`);
    await expect(rows).toHaveLength(4);

    let cpuLoad = '';

    // Step 1: Find the 'Chrome' process row and extract its CPU load dynamically
    for (const row of rows) {
        const processName = await row.locator('td').nth(0).innerText();
        
        if (processName === 'Chrome') {
            // Approach A: Using Playwright-specific object syntax options (Preferred)
            cpuLoad = await row.locator('td', { hasText: '%' }).innerText();
            
            // Approach B: Alternative Pure CSS custom syntax discussed in video
            // cpuLoad = await row.locator('td:has-text("%")').innerText();

            console.log(`CPU load of chrome: ${cpuLoad}`);
            break; // Exit the loop once the matching target data is retrieved
        }
    }

    // Step 2: Compare captured CPU load with text in the external yellow tracking label
    const yellowBoxText = await page.locator('#value-id').innerText(); // Replace selector with current dynamic ID
    console.log(`chrome CPU load from yellow box: ${yellowBoxText}`);

    // Assertion to check if the summary label string contains the exact percentage captured
    await expect(yellowBoxText).toContain(cpuLoad);

    // Optional conditional console logging validation
    if (yellowBoxText.includes(cpuLoad)) {
        console.log('CPU load of Chrome is equal');
    } else {
        console.log('CPU load of Chrome is not equal');
    }
});




// 2. Pagination Table Operations (pagination-table.spec.ts)
// This specification block handles complex data scraping over multiple pages, filtering table entries using a sizing dropdown, and executing specific field searches.

// Test Scenario A: Scrape and Print All Rows Over Multiple Pages
// TypeScript
// import { test, expect } from '@playwright/test';





test('read data from all the table pages', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    let hasMorePages = true;

    while (hasMorePages) {
        // Scrape and log all row texts from the current active page
        const rows = await page.locator('#example tbody tr').all();

        for (const row of rows) {
            const rowText = await row.innerText();
            console.log(rowText);
        }

        // Target the next pagination nav toggle button
        const nextButton = page.locator('button[aria-label="Next"]');
        const classAttribute = await nextButton.getAttribute('class');

        // Check if pagination has ended via CSS classes
        if (classAttribute?.includes('disabled')) {
            hasMorePages = false; // Gracefully terminate while loop
        } else {
            await nextButton.click();
            await page.waitForTimeout(2000); // Visual pause block to monitor table transit transitions
        }
    }
});


// Test Scenario B: Dropdown Size Filtering Configuration
// TypeScript
test('filter the rows and check the rows counter', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Select specific length sizing dropdown selector element
    const dropDown = page.locator('#example_length select');
    await dropDown.selectOption({ label: '25' });

    // Approach 1: Convert table locators to an array structure to match length bounds
    const rows = await page.locator('#example tbody tr').all();
    expect(rows.length).toBe(25);

    // Approach 2: Use direct Playwright Locator assert tracking (Recommended alternative)
    const rowsLocator = page.locator('#example tbody tr');
    await expect(rowsLocator).toHaveCount(25);
});


// Test Scenario C: Table Global Record Target Search Verification

// Playwright with TypeScript | Handle Dynamic And Pagination Web Tables (Session 10)
// SDET- QA · 12K views

// Playwright with TypeScript | Handle Dynamic And Pagination Web Tables (Session 10) 
// Opens in a new window
// TypeScript
test('search for specific data in a table', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Enter a record name that is deep within sub-pages (e.g., 'Paul Byrd') inside search bar
    const searchBox = page.locator('input[type="search"]');
    await searchBox.fill('Paul Byrd');
    await page.waitForTimeout(2000);

    const rows = await page.locator('#example tbody tr').all();
    let matchFound = false;

    if (rows.length >= 1) {
        for (const row of rows) {
            const text = await row.innerText();
            if (text.includes('Paul Byrd')) {
                console.log('record exist or found');
                matchFound = true;
                break;
            }
        }
    } else {
        console.log('no rows found with search text');
    }

    // Validate using structural boolean assertion styles
    expect(matchFound).toBe(true);
    await expect(matchFound).toBeTruthy();
});