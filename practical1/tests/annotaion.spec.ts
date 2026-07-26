import { test, expect, Locator, chromium } from '@playwright/test';

    test("tst1", async ({page}) => {
        await page.goto("https://demowebshop.tricentis.com/")
    })

    test.skip("tst2", async ({page}) => {
        await page.goto("https://demowebshop.tricentis.com/")
    })

    test("tst3", async ({page,browserName}) => {
        test.skip(browserName==='chromium','this test skipped');

        
        await page.goto("https://demowebshop.tricentis.com/")
    })