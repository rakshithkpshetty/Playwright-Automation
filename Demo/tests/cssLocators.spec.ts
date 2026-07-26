import { test, expect, Locator } from '@playwright/test';

test('Verify CSS Locators Combinations', async ({ page }) => {
    // Launch the application
    await page.goto('https://demo.nopcommerce.com/'); // Example e-commerce URL used in session [00:12:29]

    // ---------------------------------------------------------
    // 1. Tag and ID Combination (Syntax: tag#id or #id) [00:07:09]
    // ---------------------------------------------------------
    // Full version with Tag Name
    const searchBoxWithTag = page.locator('input#small-searchterms');
    await expect(searchBoxWithTag).toBeVisible(); // [00:21:29]

    // Shortcut version (Tag name is optional) [00:10:02]
    await page.locator('#small-searchterms').fill('t-shirts'); // [00:22:42]
    
    // Pause execution to visualize (Optional) [00:23:39]
    await page.waitForTimeout(5000); 

    // ---------------------------------------------------------
    // 2. Tag and Class Combination (Syntax: tag.className or .className) [00:07:46]
    // ---------------------------------------------------------
    // Full version with Tag Name
    await page.locator('input.search-box-text').fill('t-shirts'); // [00:26:50]

    // Shortcut version (Tag name is optional) [00:10:14]
    await page.locator('.search-box-text').fill('t-shirts'); // [00:27:44]

    // ---------------------------------------------------------
    // 3. Tag and Attribute Combination (Syntax: tag[attribute='value']) [00:08:04]
    // ---------------------------------------------------------
    // Full version with Tag Name
    await page.locator('input[name="q"]').fill('t-shirts'); // [01:04:56]

    // Shortcut version (Tag name is optional) [00:10:21]
    await page.locator('[name="q"]').fill('t-shirts'); // [00:31:22]

    // ---------------------------------------------------------
    // 4. Tag, Class, and Attribute Combination [00:08:46]
    // ---------------------------------------------------------
    // Used to filter down to a unique element when a class maps to multiple matches [00:33:37]
    await page.locator('input.search-box-text[name="q"]').fill('t-shirts'); // [00:36:37]

    // Shortcut version (Tag name is optional) [00:10:29]
    await page.locator('.search-box-text[name="q"]').fill('t-shirts'); // [00:37:04]
});

test('Advanced Relative CSS Locators & Pseudo-classes', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/'); // Example practice page

    // ---------------------------------------------------------
    // 5. Structural Pseudo-classes (Children Navigation) [01:08:23]
    // ---------------------------------------------------------
    // Locating the first child inside a container [01:07:48]
    const firstChild = page.locator('div.container > *:first-child');
    
    // Locating the last child inside a container [01:08:23]
    const lastChild = page.locator('div.container > *:last-child');
    
    // Locating a specific child using nth-child(index) [01:08:50]
    const thirdChild = page.locator('div.container > *:nth-child(3)');

    // ---------------------------------------------------------
    // 6. Pattern Matching Operators (Partial Matches) [01:09:51]
    // ---------------------------------------------------------
    // '^=' Operator -> Represents "Starts With" [01:11:32]
    await page.locator('input[id^="para"]').first().click(); 

    // '$=' Operator -> Represents "Ends With" [01:12:38]
    await page.locator('input[id$="attributes"]').first().click(); 

    // '*=' Operator -> Represents "Contains" substring [01:14:50]
    await page.locator('input[class*="box-text"]').first().fill('t-shirts');

    // ---------------------------------------------------------
    // 7. Sibling Operators [01:23:23]
    // ---------------------------------------------------------
    // '+' Operator -> Selects the immediate adjacent sibling element below [01:23:23]
    const nextSiblingElement = page.locator('p#para1 + p');

    // ---------------------------------------------------------
    // 8. Negation Pseudo-class (Not Operator) [01:21:13]
    // ---------------------------------------------------------
    // Selects elements that do NOT match the specified attribute rule [01:21:13]
    const nonMainParagraphs = page.locator('p:not([class="main"])');
});