import { test, expect, Locator, chromium } from '@playwright/test';

test("tabs ", async () => {
    const browser=await chromium.launch()
    const context=await browser.newContext()
    const parentpage=await context.newPage()
    

    await parentpage.goto("https://testautomationpractice.blogspot.com/")
   
    //multiple popup
    const [popup]=await Promise.all([

        parentpage.waitForEvent('popup'),parentpage.locator("#PopUp").click()
    ])
    const alltabs=context.pages()
    console.log("number",alltabs.length);
    console.log(alltabs[0].url())
    console.log(alltabs[1].url())
    //console.log(alltabs[2].url())
    
    for(const p  of  alltabs){
        const title=await p.title();
        if(title.includes('Playwright')){
            await p.locator(".getstarted_Sjon").click()
            await p.waitForTimeout(2000)
            await p.close();
        }
    }
    await  parentpage.waitForTimeout(3000)
});