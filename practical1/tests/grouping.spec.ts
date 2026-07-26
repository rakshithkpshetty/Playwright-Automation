import { test, expect, Locator,Page, chromium } from '@playwright/test';

 //open
        // login findproduct
        // logout
        // login-addtocart-logout
        // close app--after all
    let page:Page;

    test.beforeAll("open app ", async ({browser}) => {
        page=await browser.newPage()
        await page.goto("https://demoblaze.com/index.html");

       

    });

    test.afterAll("closing app ", async ({page}) => {
        page.close();

    

    });

    test.beforeEach('Login',async()=>{
        await page.locator("#login2").click();
        await page.locator("#loginusername").fill("pavashetty")
        await page.locator("#loginpassword").fill("pavan1234");
        await page.locator("button[onclick='logIn()']").click();
        await page.waitForTimeout(3000)


    })
    test.Each('Logout',async()=>{
        await page.locator("#login2").click();
        await page.locator("#loginusername").fill("pavashetty")
        await page.locator("#loginpassword").fill("pavan1234");
        await page.locator("button[onclick='logIn()']").click();
        await page.waitForTimeout(3000)


    })