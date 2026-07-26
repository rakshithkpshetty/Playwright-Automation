import { test, expect, Locator } from "@playwright/test";



test("Text input actions", async ({ page }) => {    
    await page.goto("https://ui.vision/demo/webtest/frames/");
    const frames = page.frames();
    console.log("Total number of frames in the page are: " + frames.length);

   const frame= page.frame({url:"https://ui.vision/demo/webtest/frames/frame_2"})

   if(frame){
    frame.locator("[name='mytext2']").fill("Hello Frame 2");
    frame.fill("[name='mytext2']","Hello Frame 2");
   }
   else{
    console.log("Frame not found");
   }    
   await page.waitForTimeout(3000);

});


test("Text input locatorss", async ({ page }) => {    
    await page.goto("https://ui.vision/demo/webtest/frames/");
    const frames = page.frames();
    console.log("Total number of frames in the page are: " + frames.length);

   const frame= page.frameLocator("[src='frame_1.html']").locator("[name='mytext1']").fill("Hello Frame 1");

   
   await page.waitForTimeout(3000);

});

test("Text input locatorss", async ({ page }) => {    
    await page.goto("https://ui.vision/demo/webtest/frames/");
    const frame3 = page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1"});
    await frame3?.locator("[name='mytext1']").fill("Hello Frame 1");  
   await page.waitForTimeout(3000);

});



