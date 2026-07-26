import { test, expect, Locator, chromium } from '@playwright/test';

    test("frame ", async () => {
        const browser=await chromium.launch()
        const context=await browser.newContext()
        const page1=await context.newPage()
        const page2=await context.newPage();

    await page1.goto("https://playwright.dev/");
    await expect(page1).toHaveTitle(/Playwright/)
    await page2.goto("https://www.selenium.dev/");
    await expect(page2).toHaveTitle(/Selenium/)
  
});

test("tabs ", async () => {
    const browser=await chromium.launch()
    const context=await browser.newContext()
    const parentpage=await context.newPage()
    

    await parentpage.goto("https://testautomationpractice.blogspot.com/")
    const newtab=parentpage.locator("button[onclick='myFunction()']")
    
    const [childPage]=await Promise.all([
    newtab.click(),
    context.waitForEvent('page')])
    //await parentpage.waitForTimeout(3000)

    //how to work in bot tab parallaly switch between pages

    const pages=context.pages()
    await parentpage.waitForTimeout(2000)
    console.log("Number of Pages ",pages.length);
    console.log("Title of the parent page",await pages[0].title())
    console.log("Title of the parent page",await pages[1].title())
})