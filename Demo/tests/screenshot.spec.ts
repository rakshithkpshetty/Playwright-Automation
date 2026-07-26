// Test Code (screenshots.spec.ts / tracing.spec.ts)
// This file demonstrates how to write individual tests with custom programmatic screenshot capturing and manual trace controls.

import { test, expect } from '@playwright/test';

// ==========================================
// SCENARIO 1 & 2: Local Programmatic Screenshots & Element Capture
// ==========================================
test('Screenshot Demo', async ({ page }) => {
  // Creating a timestamp to preserve old screenshots without overwriting them
  const timestamp = Date.now();

  await page.goto('https://demo.nopcommerce.com/'); // Example application URL used in session

  // 1. Capture only what is currently visible in the viewport
  await page.screenshot({ 
    path: `screenshots/homepage_${timestamp}.png` 
  });

  // 2. Capture the full page (top to bottom footer)
  await page.screenshot({ 
    path: `screenshots/fullpage_${timestamp}.png`, 
    fullPage: true 
  });

  // 3. Capture a specific element (e.g., Logo)
  const logo = page.locator('.header-logo img'); // Replace with proper logo selector
  await logo.screenshot({ 
    path: `screenshots/logo_${timestamp}.png` 
  });

  // 4. Inline element capture for a specific section (e.g., Featured Products)
  await page.locator('.product-grid.home-page-product-grid').screenshot({ 
    path: `screenshots/featured_products_${timestamp}.png` 
  });
});

// ==========================================
// SCENARIO 3: Local Programmatic Tracing via Context
// ==========================================
test('Programmatic Tracing Demo', async ({ context, page }) => {
  // Start tracing before your test steps begin
  await context.tracing.start({ 
    screenshots: true, 
    snapshots: true 
  });

  // Test Steps
  await page.goto('https://demo.nopcommerce.com/login');
  await page.locator('#Email').fill('testuser@example.com');
  await page.locator('#Password').fill('SecurePassword123');
  await page.locator('button:has-text("Log in")').click();

  // Stop tracing and save the generated .zip file locally to your project directory
  await context.tracing.stop({ 
    path: 'trace.zip' 
  });
});
// 2. Configuration Settings (playwright.config.ts)
// To apply automated captures, video recording, global trace logging, or test retries globally across your entire project, add or update the use configuration and retries properties inside your configuration file:

// TypeScript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  
  // Configure Retries Globally (Handles Flaky Tests)
  // use process.env.CI ? 2 : 0 for CI environments or set a hardcoded number for local debugging
  retries: 3, 

  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying a failed test. See https://playwright.dev/docs/trace-viewer */
    // Global Trace Settings options: 'off', 'on', 'retain-on-failure', 'on-first-retry'
    trace: 'on', 

    // Global Screenshot Settings options: 'off', 'on', 'only-on-failure', 'on-first-failure'
    screenshot: 'only-on-failure', 

    // Global Video Settings options: 'off', 'on', 'retain-on-failure', 'on-first-retry'
    video: 'retain-on-failure', 
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
// });
// 3. Useful Command Line Shortcuts
// You can also trigger these behaviors straight from your terminal runner dynamically:

// Run a specific test with tracing explicitly turned on:

// Bash
// npx playwright test tracing.spec.ts --trace on --headed
// Manually view a programmatically generated trace file:

// Bash
// npx playwright show-trace trace.zip
// Run a specific test with retries specified at runtime:

// Bash
// npx playwright test flaky-test.spec.ts --retries=3 --headed