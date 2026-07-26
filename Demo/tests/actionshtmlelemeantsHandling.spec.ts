import { test, expect, Locator } from "@playwright/test";

// ==========================================
// SCENARIO 1: TEXT INPUT ACTIONS
// ==========================================
test("Text input actions", async ({ page }) => {
  // Launch the practice application web page
  await page.goto("https://testautomationpractice.blogspot.com/");

  // Capture the input box element using its ID selector (#name)
  const textbox: Locator = page.locator("#name");

  // 1. Verify visibility assertion
  await expect(textbox).toBeVisible();

  // 2. Verify enabled status assertion
  await expect(textbox).toBeEnabled();

  // 3. Capture attribute value (e.g., max length) and verify it
  const maxLength: string | null = await textbox.getAttribute("maxlength");
  expect(maxLength).toBe("15"); // Value assertion (no await needed)

  // 4. Fill text data inside the input box
  await textbox.fill("John Kennedy");

  // 5. Retrieve the entered input value (textcontent will not work for input fields)
  const enteredValue: string = await textbox.inputValue();
  console.log("Input value of the first name is: " + enteredValue);

  // 6. Verify the captured input value
  expect(enteredValue).toBe("John Kennedy");

  // Pause execution briefly to visually inspect the state
  await page.waitForTimeout(3000);
});

// ==========================================
// SCENARIO 2: RADIO BUTTON ACTIONS
// ==========================================
test("Radio button actions", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  // Capture the male radio button using ID selector (#male)
  const maleRadio: Locator = page.locator("#male");

  // 1. Verify basic assertions (visibility and enabled state)
  await expect(maleRadio).toBeVisible();
  await expect(maleRadio).toBeEnabled();

  // 2. Verify default state (should be unchecked / false by default)
  // Approach A: Using boolean check
  expect(await maleRadio.isChecked()).toBe(false);

  // 3. Select / Check the radio button
  await maleRadio.check();

  // 4. Verify state after checking
  // Approach A (Boolean verification)
  expect(await maleRadio.isChecked()).toBe(true);

  // Approach B (Direct element assertion - Highly Preferred)
  await expect(maleRadio).toBeChecked();

  await page.waitForTimeout(3000);
});

// ==========================================
// SCENARIO 3: CHECKBOX ACTIONS (ALL SCENARIOS)
// ==========================================
test("Checkbox actions", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  // Define an array with all the checkbox text labels available on the page
  const days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  // Map the string array into a locator type array of checkbox elements
  const checkboxes: Locator[] = days.map(index => page.getByLabel(index));

  // --- Scen. 3.1: Select a specific checkbox by label ---
  const sundayCheckbox: Locator = page.getByLabel("Sunday");
  await sundayCheckbox.check();
  await expect(sundayCheckbox).toBeChecked();

  // --- Scen. 3.2: Verify the count of total checkboxes ---
  expect(checkboxes.length).toBe(7);

  // --- Scen. 3.3: Select all checkboxes using a loop & assert immediately ---
  for (const checkbox of checkboxes) {
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }
  await page.waitForTimeout(2000);

  // --- Scen. 3.4: Uncheck last 3 checkboxes using slice(-3) & assert negative condition ---
  for (const checkbox of checkboxes.slice(-3)) {
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked(); // .not acts as a negation operator
  }
  await page.waitForTimeout(3000);

  // --- Scen. 3.5: Toggle Checkboxes (Check if unchecked, uncheck if checked) ---
  for (const checkbox of checkboxes) {
    if (await checkbox.isChecked()) {
      await checkbox.uncheck();
      await expect(checkbox).not.toBeChecked();
    } else {
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    }
  }
  await page.waitForTimeout(3000);

  // Reset/Uncheck all for the next scenario
  for (const checkbox of checkboxes) {
    await checkbox.uncheck();
  }

  // --- Scen. 3.6: Randomly select checkboxes using explicit index values (e.g., 1, 3, 6) ---
  const indexes: number[] = [1, 3, 6];
  for (const i of indexes) {
    await checkboxes[i].check();
    await expect(checkboxes[i]).toBeChecked();
  }
  await page.waitForTimeout(5000);

  // Reset/Uncheck all for the next scenario
  for (const checkbox of checkboxes) {
    await checkbox.uncheck();
  }

  // --- Scen. 3.7: Select a checkbox dynamically based on a string value parameter ---
  const weekName: string = "Friday";

  for (const label of days) {
    // Perform case-insensitive string matching
    if (label.toLowerCase() === weekName.toLowerCase()) {
      const checkbox = page.getByLabel(label);
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    }
  }
  await page.waitForTimeout(5000);
}); 