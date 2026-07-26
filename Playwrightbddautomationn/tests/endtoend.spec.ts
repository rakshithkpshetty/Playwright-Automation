import {expect,test} from '@playwright/test'

test("goto demoblaze.com",async ({page})=>{
    await page.goto("https://www.demoblaze.com");


})