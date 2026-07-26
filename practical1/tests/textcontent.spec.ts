import { test, expect, Locator } from '@playwright/test';

test("sample dynamic elements", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/")
    const locat:Locator=page.locator(".product-title");
    console.log("text content",await locat.nth(1).textContent())
    //await  expect(locat.nth(1).innerText()).toBe()
    console.log("inner ",await locat.nth(1).textContent())
    const count=await locat.count();
    for(let i=0;i<count;i++){
        const productname:string=await locat.nth(i).innerText()
        const prod:string|null=await locat.nth(i).textContent();

        console.log(productname)
        console.log(prod)


    }


    

});

test("static table",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const table=await page.locator("table[name='BookTable']");

    });