import {test,expect} from "@playwright/test";
  test(" demo",async({page})=>{

    await page.goto("https://demo.nopcommerce.com/");
    //await expect(page.locator("//@class='topic-block-title'")).toBeVisible
    await expect(page.locator("/html[1]/body[1]/div[6]/header[1]/div[2]/div[2]/form[1]/input[1]")).toBeVisible



     
})