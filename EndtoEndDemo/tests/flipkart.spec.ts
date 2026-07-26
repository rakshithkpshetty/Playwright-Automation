import { expect, Locator, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('TC2:flipkart flow @smoke', async ({ page }) => {
    await page.goto('https://www.flipkart.com/');
    //const homePage=new HomePage(page);'
    // wait for page load
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!/);
});

test('TC3: search suggestions appear when typing iph', async ({ page }) => {
    await page.goto('https://www.flipkart.com/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000)
    const closePopupButton = page.locator("//span[@]class='b3wTlE']");
    if (await closePopupButton.isVisible().catch(() => false)) {
        await closePopupButton.click();
    }

    const searchBox = page.locator('input[title="Search for Products, Brands and More"], input[placeholder="Search for Products, Brands and More"]').first();
    await expect(searchBox).toBeVisible();
    await searchBox.fill('iph');

    // If you want the suggestion locator, open DevTools and inspect the dropdown item.
    // A simple locator for the suggestion can be created using text matching.
    const suggestion = page.locator('a, div').filter({ hasText: /iphone|iph/i }).first();

    await expect(suggestion).toBeVisible({ timeout: 10000 });
    await page.pause();
    await expect(suggestion).toContainText(/iphone|iph/i);
    await page.waitForTimeout(3000)
});
/*
pages----loginPage.ts
        RegisterPage.ts
        HomeAPage.ts
test-----login.soec.yts
        Regiister.spec.ts
        HomePage.spec.ts
utils--utils.ts
test-report---html
        allure reports
        screenshot
        vediofolde
        trace.zip
packge.jsom---all dependenciwes  wwhile we are starting it will genereate all the dependencies automatically

playwright.config.file--default config  
timeout:30000
retries:0,
workers: 1,
projects:[{name:Chromium use:{...devices['Desktop chrome]}},
{'webkit',use:{...device['desktop safari]}}{}}}]}}]
all the configuration place here only 
no use attributes //relative using xpaa th along with attributes
it willll veruy fragile an it will break easily
actions allows playwrighrt to interz=acr wornh th ehtml elements
checkboxesinput radionbutto checckk boxxe mouse click keyoard acions file uploa s file download and all 
dynamic

(//li[@class='humcQA'])[3]
*/
test.beforeEach("before",async({page})=> {
    await page.goto("https://testautomationpractice.blogspot.com/");
    
});
test("checkbox@sanity",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const Sunday=page.getByLabel("Sunday");
    const days=['Sunday',"Monday","Tuesday"];
    for(let day of days){
        await page.getByLabel(day).check()
        await expect(page.getByLabel(day)).toBeChecked();

    }
    
        
    await Sunday.check();
    await expect(Sunday).toBeChecked();
    await  page.waitForTimeout(4000);
    const countrydrop=page.locator("#country");
    await countrydrop.selectOption("India");
    await expect(page.getByText("India")).toBeHidden();
    const alert=page.locator("#alertBtn")
    await alert.click()
    await  page.waitForTimeout(4000);
    

    page.on('dialog',async (dialog)=>{
        console.log(dialog.message())
        await dialog.accept();
    
        await page.waitForTimeout(4000);
    });

    //frames


});

test("tables@t",async({page})=>{
    await page.goto("https://www.w3schools.com/html/html_tables.asp")

    const table=page.locator("#customers");
    console.log(""  ,await table.allTextContents());


});