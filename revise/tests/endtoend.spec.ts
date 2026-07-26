import {expect,test} from '@playwright/test'

test("goto the website",async({page})=>{
    await page.goto("https://www.demoblaze.com");
    await expect(page).toHaveTitle("STORE");
    await page.getByText("Laptops").click();
    await page.getByText("Sony vaio i5").click();
    await page.on('dialog',async(dialog)=>{
    console.log("mesage -->",await dialog.message());
    console.log("mesage -->",await dialog.type());
    await dialog.accept();
    })
    await page.getByText("Add to cart").click();
    //await page.getByRole("button").click();
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'Cart', exact: true }).click();
    await page.waitForTimeout(6000)
    
    
    await expect(page.getByText('Total', { exact: true })).toBeVisible();
    await expect(page.getByText("Sony vaio i5")).toBeVisible();
    await  page.getByText("Home").click();
    await page.waitForTimeout(6000)
    //await page.waitForLoadState();
    await page.getByText("Monitors").click();
    await page.waitForTimeout(6000)
    console.log("counting...",await page.locator("#tbodyid").count());
    //await page.waitForTimeout(6000)
    
    
    
})