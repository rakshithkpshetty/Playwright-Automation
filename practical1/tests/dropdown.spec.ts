import {test,expect, Locator} from '@playwright/test';
 
test("TsxtBox actions",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    // await page.locator('#country').selectOption("India")//visible text
    // await page.locator("#country").selectOption({value:"usa"})///using value attributes

    // await page.locator("#country").selectOption({label:"United States"})
    await page.locator("#country").selectOption({index:3})
    await page.waitForTimeout(2000);
    const countrydrop=page.locator("#country option");
    await expect(countrydrop).toHaveCount(10);
    const opt=(await countrydrop.allTextContents()).map(ele=>ele.trim());
    console.log(opt)
    await page.waitForTimeout(3000);
    for(const op of opt){
        console.log(op)
    }
    const colors= page.locator("#colors").selectOption(['Red','Green']);
    await page.waitForTimeout(2000);
    
    

    //console.log(colors.allInnerTexts());


});