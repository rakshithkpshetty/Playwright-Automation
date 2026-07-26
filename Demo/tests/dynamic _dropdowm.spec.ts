 //Auto-Suggest Dropdown Code (autosuggest_dropdown.spec.ts)This script fills a search keyword (smart), waits for the dynamic elements to load from the server via an AJAX call, prints all suggested options, and clicks on a specific option (smartphone).TypeScript
 import { test, expect } from '@playwright/test';

test('Auto Suggest Dropdown Handling', async ({ page }) => {
    // 1. Navigate to the application
    await page.goto('https://www.flipkart.com/');

    // 2. Locate the search box and input a keyword
    // Using CSS selector targeting the input box via its name attribute
    await page.locator("input[name='q']").fill('smart');

    // 3. Wait for dynamic server/AJAX data to populate the options
    await page.waitForTimeout(3000);

    // 4. Locate all suggested options from the list
    const options = page.locator('ul li');
    const count = await options.count();
    console.log(`Number of suggested options: ${count}`);

    console.log('--- Printing all the auto suggestions ---');
    // 5. Loop through options, print them, and click on 'smartphone'
    for (let i = 0; i < count; i++) {
        // Retrieve text using innerText or textContent
        const text = await options.nth(i).innerText();
        console.log(text);

        // Click on the specific option and exit loop
        if (text === 'smartphone') {
            await options.nth(i).click();
            break;
        }
    }

    // Optional delay to observe the navigation after clicking
    await page.waitForTimeout(5000);
});
//2. Hidden Bootstrap Dropdown Code (bootstrap_hidden_dropdown.spec.ts)This script completes the user login process on OrangeHRM, navigates to the PIM tab, expands the hidden Bootstrap job title dropdown menu, prints all listed options via an array, and selects the "Automation Tester" item.TypeScriptimport { test, expect } from '@playwright/test';

test('Bootstrap Hidden Dropdown Handling', async ({ page }) => {
    // 1. Navigate to the login page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2. Complete Login Steps
    await page.locator("input[name='username']").fill('Admin');
    await page.locator("input[name='password']").fill('admin123');
    await page.locator("button[type='submit']").click();

    // 3. Navigate to PIM tab using Playwright's getByText
    await page.getByText('PIM').click();

    // 4. Click and open the Job Title dropdown (2nd dropdown matching the form's icons)
    const dropdowns = page.locator('form i');
    await dropdowns.nth(2).click();

    // 5. Wait for AJAX/dynamic options to load in DOM
    await page.waitForTimeout(3000);

    // 6. Locate options inside the active list box structure
    const options = page.locator("div[role='listbox'] span");
    const count = await options.count();
    console.log(`Number of options in dropdown: ${count}`);

    // --- Approach A: Using allTextContents() to log values as an array ---
    const allTextValues = await options.allTextContents();
    console.log('Printing all options array:', allTextValues);

    // --- Approach B: Traditional loop to check text and select an element ---
    for (let i = 0; i < count; i++) {
        const text = await options.nth(i).textContent();
        
        if (text?.trim() === 'Automation Tester') {
            await options.nth(i).click();
            break;
        }
    }

    // Keep page open momentarily to verify success
    await page.waitForTimeout(5000);
});
//💡 Key Takeaways from the Session:Why selectOption doesn't work: Modern Bootstrap/Hidden components use custom div and span layers instead of standard HTML <select> tags. You must click to reveal and loop to interact with them.Why explicitly wait? Dynamic elements send asynchronous API requests to the server when typing or clicking dropdown tags. A short page.waitForTimeout() prevents capturing 0 elements before the DOM populates.Inspecting Hidden items: Use the control + shift + p (Windows) or command + shift + p (Mac) command palette inside the DevTools DOM and apply the "Emulate focused page" command to freeze disappearing dropdown menus.