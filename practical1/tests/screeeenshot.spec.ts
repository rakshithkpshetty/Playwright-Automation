import { test, expect, Locator, chromium } from '@playwright/test';

    test("frame ", async ({page}) => {
        await page.goto("https://demowebshop.tricentis.com/")
        const timestamp=Date.now()
        await page.screenshot({path:'screenshot/'+'homepage'+timestamp+'.png'})
        await page.screenshot({path:'screenshot/'+'homepage'+timestamp+'.png',fullPage:true})
        const logo=page.locator("img[alt='Tricentis Demo Web Shop']")
        logo.screenshot({path:'screenshot/'+'homepageLogo'+timestamp+'.png'})

        //flaky 
        // serverplayer
        // network issue 
        // ui ocverlap 
        // animation run on web page
        // Ui
        // nt16Arrayanimmation running
        //--------------------------
        retry :3
        



    });