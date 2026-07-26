import {expect,Locator,test} from "playwright/test";

test("sample dynamic ele",async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    for(let i=0;i<5;i++){
    //const button=await  page.locator("//button[text()='START' or text()='STOP']");
    const button= page.getByRole('button',{name:/START|STOP/})
    
    await button.click();
    await page.waitForTimeout(2000);

}

});