import {test,expect} from 'playwright/test';

test("e2e continuation",async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const buttonconfirm=page.locator("#confirmBtn");
    page.on('dialog', async (dialog) => {
        // accept the dialog
        console.log(dialog.message());
        console.log(dialog.type());
        await dialog.accept();
    });
    // trigger the confirm dialog
    await buttonconfirm.click();  

});