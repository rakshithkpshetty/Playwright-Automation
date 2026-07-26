import { test, expect } from '@playwright/test';

test('Demonstrating Playwright Built-In Locators', async ({ page }) => {
  // 1. Navigate to the demo e-commerce site
  await page.goto('https://demo.nopcommerce.com/');

  // 2. getByRole() - Locate the search input and search button by their ARIA roles
  // Good for buttons, links, headings, checkboxes, etc.
  const searchInput = page.getByRole('combobox', { name: 'Search store' });
  await searchInput.fill('iPhone 16');
  
  const searchButton = page.getByRole('button', { name: 'Search' });
  await searchButton.click();

  // 3. getByLink() / getByRole('link') - Navigate to the Login page
  await page.getByRole('link', { name: 'Log in' }).click();

  // 4. getByPlaceholder() - Fill in details using placeholder text
  await page.getByPlaceholder('Enter Product Name...').fill('Laptop'); // Example if placeholder exists

  // 5. getByLabel() - Locate form inputs by their associated <label> text
  // Ideal for form fields like Email and Password
  await page.getByLabel('Email:').fill('testuser@example.com');
  await page.getByLabel('Password:').fill('SecurePassword123');

  // 6. getByText() - Locate elements by their visible text content
  // Great for verifying UI text, error messages, or clicking generic text links
  await expect(page.getByText('Welcome, Please Sign In!')).toBeVisible();

  // 7. getByAltText() - Locate images by their alternative text description
  // Useful for clicking image logos, product thumbnails, or banners
  const logo = page.getByAltText('nopCommerce demo store');
  await expect(logo).toBeVisible();
  await logo.click(); // Returns to homepage

  // 8. getByTitle() - Locate elements using their HTML 'title' attribute
  // Commonly used for tooltips or specific icon buttons
  // Example: page.getByTitle('Close').click();

  // 9. getByTestId() - Locate elements by data-testid (Best practice for robust testing)
  // Requires configuring testIdAttribute in playwright.config.ts if using custom attributes
  // Example: await page.getByTestId('submit-order-button').click();
});
