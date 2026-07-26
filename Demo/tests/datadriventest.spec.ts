peScript
import { test, expect } from '@playwright/test';

// 1. Define the test data array
const searchItems: string[] = ['laptop', 'gift card', 'smartphone', 'monitor'];

test.describe('Product Search Data Driven Suite', () => {
    
    // 2. Loop through each item to generate dynamic tests
    for (const item of searchItems) {
        
        test(`Search test for item: ${item}`, async ({ page }) => {
            // Launch web page
            await page.goto('https://demo.nopcommerce.com/');

            // Input search keyword
            await page.locator('#small-searchterms').fill(item);
            await page.locator('button:has-text("Search")').click();

            // Capture product list and assert item matching (ignoring text case constraints)
            const productTitle = page.locator('.product-title a').first();
            await expect(productTitle).toContainText(item, { ignoreCase: true });
        });
    }
// });


// 2. Two-Dimensional Array (Login Matrix Test)
// This covers data-driven matrices supporting positive and negative user combinations using array destructuring inside a for...of loop execution block.

// TypeScript
// import { test, expect } from '@playwright/test';

// Two dimensional data framework structure: [Email, Password, Expected Validity Outcome]
const loginTestData = [
    ['admin@yourstore.com', 'admin', 'valid'],
    ['admin@yourstore.com', 'wrong_pass', 'invalid'],
    ['invalid_user@yourstore.com', 'admin', 'invalid'],
    ['', '', 'invalid']
];

test.describe('Login Data Driven Matrix Suite', () => {

    for (const [email, password, validity] of loginTestData) {
        
        test(`Login test profile details: ${email} / ${password}`, async ({ page }) => {
            await page.goto('https://admin-demo.nopcommerce.com/login');

            // Fill inputs
            await page.locator('#Email').fill(email);
            await page.locator('#Password').fill(password);
            await page.locator('button[type="submit"]').click();

            // Dynamic evaluation switch
            if (validity.toLowerCase() === 'valid') {
                // If data sequence is valid, expect navigation success (Logout link visible)
                const logoutLink = page.locator('text=Logout');
                await expect(logoutLink).toBeVisible({ timeout: 5000 });
            } else {
                // Else evaluate expected block conditions for missing/erroneous strings
                const errorMessage = page.locator('.validation-summary-errors');
                await expect(errorMessage).toBeVisible({ timeout: 5000 });
                
                // Assert that the user remains on the login interface
                await expect(page).toHaveURL(/.*login/);
            }
        });
    }
// });



// Session 3: Parameterization Using External JSON
// This method loads structured text data natively using Node's standard file system (fs) modules.

// TypeScript

// 1. Resolve relative path environment layout definitions safely
const jsonPath = path.resolve(__dirname, '../test-data/data.json');

// 2. Synchronously read layout buffers and parse to generic 'any' data array mapping
const loginData: any = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

test.describe('JSON External Data Driven Profile Suite', () => {

    for (const record of loginData) {
        
        test(`Login verification from JSON data element: ${record.email}`, async ({ page }) => {
            await page.goto('https://admin-demo.nopcommerce.com/login');

            await page.locator('#Email').fill(record.email);
            await page.locator('#Password').fill(record.password);
            await page.locator('button[type="submit"]').click();

            if (record.validity.toLowerCase() === 'valid') {
                await expect(page.locator('text=Logout')).toBeVisible({ timeout: 5000 });
            } else {
                await expect(page.locator('.validation-summary-errors')).toBeVisible({ timeout: 5000 });
            }
        });
    }
});
Session 4: Parameterization Using CSV Files
Requires installing the package parsing module prerequisite dependency standard via terminal first: npm install csv-parse

TypeScript
import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
// Import sync parser components explicitly
import { parse } from 'csv-parse/sync';

// 1. Locate file path targeting the .csv content layout destination
const csvPath = path.resolve(__dirname, '../test-data/data.csv');

// 2. Load continuous strings and evaluate structural headers dynamically
const fileContent = fs.readFileSync(csvPath, 'utf-8');
const records: any[] = parse(fileContent, {
    columns: true,           // Uses the first row layout contents as object structural map keys
    skip_empty_lines: true   // Strips trailing index errors safely 
});

test.describe('CSV Parameterized Suite Execution', () => {

    for (const data of records) {
        
        test(`CSV Matrix evaluation profiling: ${data.email}`, async ({ page }) => {
            await page.goto('https://admin-demo.nopcommerce.com/login');

            // Map variables dynamically matching CSV layout column header identifiers
            await page.locator('#Email').fill(data.email);
            await page.locator('#Password').fill(data.password);
            await page.locator('button[type="submit"]').click();

            if (data.validity.toLowerCase() === 'valid') {
                await expect(page.locator('text=Logout')).toBeVisible({ timeout: 5000 });
            } else {
                await expect(page.locator('.validation-summary-errors')).toBeVisible({ timeout: 5000 });
            }
        });
    }
});
Session 5: Parameterization Using Excel Files (.xlsx)
Requires downloading the third-party structural module library framework wrapper first: npm install xlsx

TypeScript
import { test, expect } from '@playwright/test';
import * as path from 'path';
// Import structural Excel helper libraries natively
import * as xlsx from 'xlsx';

// 1. Setup global path target configurations 
const excelPath = path.resolve(__dirname, '../test-data/data.xlsx');

// 2. Extract workbook structure details systematically: Workbook -> SheetNames -> Target Worksheet
const workbook = xlsx.readFile(excelPath);
const sheetName = workbook.SheetNames[0]; // Fetch first targeted spreadsheet location trace 
const worksheet = workbook.Sheets[sheetName];

// 3. Transform complex worksheet matrices safely directly into standard JSON array formats
const loginData: any[] = xlsx.utils.sheet_to_json(worksheet);

test.describe('Excel Data Driven Execution Matrix', () => {

    for (const record of loginData) {
        
        test(`Excel dynamic validation testing targeting context: ${record.email}`, async ({ page }) => {
            await page.goto('https://admin-demo.nopcommerce.com/login');

            // Extract cells based directly on row header schema columns mapping matching keys
            await page.locator('#Email').fill(record.email || '');
            await page.locator('#Password').fill(record.password || '');
            await page.locator('button[type="submit"]').click();

            // Convert target parameter casing variants to lowercase safely before tracking logic comparisons
            const baselineCheck = String(record.validity).toLowerCase();

            if (baselineCheck === 'valid') {
                await expect(page.locator('text=Logout')).toBeVisible({ timeout: 5000 });
            } else {
                await expect(page.locator('.validation-summary-errors')).toBeVisible({ timeout: 5000 });
            }
        });
    }
});