// 1. Single Select Dropdown (single-select-dropdown.spec.ts)This script demonstrates the four different ways to select an option from a single-select dropdown using the selectOption method (by visible text, value attribute, label, and index), as well as counting and asserting the total number of options, and checking for the presence of a specific text option using .allTextContents() and Array.prototype.map().TypeScriptimport { test, expect } from '@playwright/test';
import { test, expect }  from '@playwright/test';


test('Single Select Dropdown Operations', async ({ page }) => {
  // Launch the page
  await page.goto('https://itera-qa.azurewebsites.net/home/automation'); // Example practice URL from session

  const countryDropdownLocator = page.locator('#country');

  // Approach 1: Select option by Visible Text
  await countryDropdownLocator.selectOption('India');
  await page.waitForTimeout(2000);

  // Approach 2: Select option by Value Attribute
  await countryDropdownLocator.selectOption({ value: 'UK' });
  await page.waitForTimeout(2000);

  // Approach 3: Select option by Label
  await countryDropdownLocator.selectOption({ label: 'India' });
  await page.waitForTimeout(2000);

  // Approach 4: Select option by Index (0-based)
  await countryDropdownLocator.selectOption({ index: 3 }); // Selects Germany
  await page.waitForTimeout(2000);

  // --- Assertions & Validations ---

  // 1. Check and Validate Number of Options (Count)
  const dropdownOptions = page.locator('#country > option');
  await expect(dropdownOptions).toHaveCount(10);

  // 2. Check if a specific option is present in the dropdown
  const allTextContents = await dropdownOptions.allTextContents();
  
  // Trim right and left spaces from all elements using map
  const optionsText = allTextContents.map(text => text.trim());
  
  console.log('All individual options:', optionsText);

  // Assertion to check if 'Japan' is present in the array
  expect(optionsText).toContain('Japan');

  // 3. Printing all options in the console via a loop
  for (const option of optionsText) {
    console.log('Option:', option);
  }
});
//2. Multi Select Dropdown (multi-select-dropdown.spec.ts)This script demonstrates how to select multiple values at once from a multi-select dropdown or list box by passing array inputs into the selectOption method using all four selection strategies.TypeScriptimport { test, expect } from '@playwright/test';

test('Multi Select Dropdown Operations', async ({ page }) => {
  await page.goto('https://itera-qa.azurewebsites.net/home/automation');

  const colorsDropdownLocator = page.locator('#colors');

  // Approach 1: Select multiple options by Visible Text
  await colorsDropdownLocator.selectOption(['Red', 'Blue', 'Green']);
  await page.waitForTimeout(2000);

  // Approach 2: Select multiple options by Value Attribute
  await colorsDropdownLocator.selectOption([{ value: 'red' }, { value: 'green' }, { value: 'white' }]);
  await page.waitForTimeout(2000);

  // Approach 3: Select multiple options by Label
  await colorsDropdownLocator.selectOption([{ label: 'Red' }, { label: 'Green' }, { label: 'Yellow' }]);
  await page.waitForTimeout(2000);

  // Approach 4: Select multiple options by Index
  await colorsDropdownLocator.selectOption([{ index: 0 }, { index: 1 }, { index: 4 }]);
  await page.waitForTimeout(2000);

  // --- Count and Presence Validations ---
  const colorOptions = page.locator('#colors > option');
  await expect(colorOptions).toHaveCount(7);

  const rawTexts = await colorOptions.allTextContents();
  const cleanOptionsText = rawTexts.map(t => t.trim());

  // Check presence of 'Green'
  expect(cleanOptionsText).toContain('Green');

  // Print elements sequentially
  for (const color of cleanOptionsText) {
    console.log('Color option found:', color);
  }
});
//3. Verify Dropdown Sorting (sorted-dropdown.spec.ts)This code captures options into an original array and compares it against a sorted version of itself using TypeScript's sort() method. To avoid modifying the source array dynamically due to mutability, the Spread Operator ([...]) is used.TypeScriptimport { test, expect } from '@playwright/test';

test('Verify Dropdown Sorting Order', async ({ page }) => {
  await page.goto('https://itera-qa.azurewebsites.net/home/automation');

  // Locator targeting the sorted element list (e.g., #animals)
  const animalOptions = page.locator('#animals > option');

  const rawTexts = await animalOptions.allTextContents();
  const optionsText = rawTexts.map(text => text.trim());

  // Use Spread Operator (...) to decouple copy references and keep original array intact
  const versionList = [...optionsText];
  const sortedList = [...optionsText].sort();

  console.log('Original List from Webpage:', versionList);
  console.log('Programmatically Sorted List:', sortedList);

  // Assert if original list matches alphabetically sorted structure
  await expect(versionList).toEqual(sortedList);
});
//4. Find Duplicate Dropdown Options (duplicate-dropdown.spec.ts)This program isolates duplicate values inside drop-down options utilizing a standard Set collection (which handles only unique elements) alongside an empty results array to store items that fail the unique constraint checks.TypeScriptimport { test, expect } from '@playwright/test';

test('Verify Dropdown Contains Duplicates', async ({ page }) => {
  await page.goto('https://itera-qa.azurewebsites.net/home/automation');

  const colorsOptions = page.locator('#colors > option');
  const rawTexts = await colorsOptions.allTextContents();
  const optionsText = rawTexts.map(text => text.trim());

  // Setup Set and Array structural boundaries
  const mySet = new Set<string>();
  const duplicates: string[] = [];

  // Logic processing to isolate non-unique text elements
  for (const text of optionsText) {
    if (mySet.has(text)) {
      duplicates.push(text); // Found duplicate! Add to duplicates tracking collection
    } else {
      mySet.add(text);       // First time seeing this string, store inside the Set container
    }
  }

  // Print results to terminal console output
  if (duplicates.length > 0) {
    console.log('Duplicate options found:', duplicates);
  } else {
    console.log('No duplicate options found.');
  }

  // Assertion: Expect total count of isolated duplicates array to equal 0 
  expect(duplicates.length).toBe(0);
});