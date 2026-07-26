import {test,expect, Locator} from '@playwright/test';
 
test("TsxtBox actions",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await expect(page).toHaveTitle("Automation Testing Practice");
    //await expect(page).toHaveTitle("Automation Testing Practice");
    const textboxname:Locator=page.getByPlaceholder("Enter Name")
    await textboxname.fill("Rakshith");
    const entered:string=await textboxname.inputValue()

    const maxiLength:string|null   =await textboxname.getAttribute("maxlength");
    expect(maxiLength).toBe ("15")
    console.log("  value   ", entered )


    



})
