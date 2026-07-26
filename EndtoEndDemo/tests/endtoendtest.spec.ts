import {expect,test} from '@playwright/test';

test("TC1: to do  app @sanity",async({page})=>{
    await page.goto("https://todomvc.com/");
    await expect(page.locator(".logo[alt='TodoMVC']")).toBeVisible();
    //await expect(page.getByLabel("React")).toBeVisible();
    // await page.locator("//span[text()='React']").click();
    // await expect(page).toHaveURL("https://todomvc.com/examples/react/dist/");
    // const inputbox=page.getByPlaceholder("What needs to be done?");
    // await expect(page).toHaveTitle("TodoMVC: React");
    // await page.waitForTimeout(5000);
    // await inputbox.fill("Salenium")

    // await inputbox.press('Enter');
    // await inputbox.fill("Typescript")
    // await inputbox.press('Enter');
    // await expect(page.locator("//*[text()='Typescript']")).toBeVisible();
    // await page.waitForTimeout(5000);
    // await inputbox.fill("Typescript")
    // await inputbox.press('Enter');
    //  console.log("counting...",await page.locator(".todo-list").count())
    // await expect(page.locator(".todo-list>li")).toHaveCount(2);
    
    // console.log("counting...",await page.locator(".todo-list>li").count())
    // //await page.loca

    




    

})