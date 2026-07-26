
import { test, expect } from '@playwright/test';

test.describe('Playwright Session 9: Text Extraction & Web Tables', () => {

    test('Scenario 1: Various ways to extract text from elements', async ({ page }) => {
        await page.goto('https://example.com/elements'); // Replace with your target URL

        // 1. Using textContent() - Includes hidden text, returns string | null
        const textContent = await page.locator('.heading-class').textContent();
        console.log('Text Content:', textContent);

        // 2. Using innerText() - Only returns visible text (as it renders)
        const innerText = await page.locator('.description-class').innerText();
        console.log('Inner Text:', innerText);

        // 3. Using inputValue() - Specifically for input fields, textareas, or selects
        const usernameValue = await page.locator('#username-input').inputValue();
        console.log('Input Value:', usernameValue);

        // 4. Using allTextContents() - Extracts text from multiple matching elements into an array
        const allListItems = await page.locator('.menu-items li').allTextContents();
        console.log('All List Items:', allListItems);

        // Assertions using extracted text
        expect(textContent?.trim()).toBe('Welcome');
    });

    test('Scenario 2: Handling Web Tables', async ({ page }) => {
        await page.goto('https://example.com/tables'); // Replace with your target URL

        // Locate the table
        const table = page.locator('#web-table');

        // 1. Get total number of rows and columns
        const rows = table.locator('tr');
        const rowCount = await rows.count();
        console.log(`Total Rows: ${rowCount}`);

        // 2. Read specific cell data (e.g., Row 2, Column 3)
        const specificCell = table.locator('tr').nth(1).locator('td').nth(2);
        console.log('Specific Cell Data:', await specificCell.innerText());

        // 3. Iterate through all rows and print column data dynamically
        for (let i = 1; i < rowCount; i++) { // Skipping header row (index 0)
            const currentRow = rows.nth(i);
            const rowData = await currentRow.locator('td').allTextContents();
            console.log(`Row ${i} Data:`, rowData);
        }

        // 4. Find a specific row based on condition (e.g., locate user 'John' and click delete)
        const targetRow = table.locator('tr', { hasText: 'John Doe' });
        await targetRow.locator('.delete-btn').click();
    });
});
// Key Takeaways from this code:
// textContent() vs innerText(): textContent captures everything (even if hidden by CSS), while innerText respects styling and only grabs what a human user can see.

// allTextContents(): Essential when you want to scrape a list or an array of values instantly without looping.

// Table Traversal: Using .nth() allows you to zero in on specific indexes, while the { hasText: '...' } locator filter is the cleanest way to interact with a specific row dynamically based on a value.