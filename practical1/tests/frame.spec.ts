import { test, expect, Locator } from '@playwright/test';

test("frame ", async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/")
    const inputbox=page.frameLocator("[src='frame_1.html']").locator("[name='mytext1']")
     await inputbox.fill("John");
     await page.waitForTimeout(4000)
});

test.only("3rd frame", async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/")
   // get the actual Frame object (not FrameLocator) by matching its URL
   const frame3 = page.frame({ url: "https://ui.vision/demo/webtest/frames/frame_3" });
   if (frame3) {
      await frame3.locator("[name='mytext3']").fill("Ram");
      const childFrames=frame3.childFrames();
      console.log('no of childs',childFrames.length);
      const radio=childFrames[0].getByLabel("Hi, I am the UI.Vision IDE")
      await radio.check()
      await expect(radio).toBeChecked();
   } else {
      console.log("frame 3 is not found");
   }
await page.waitForTimeout(3000);
   
}); 
