import {test,expect, Locator} from 'playwright/test'

test("sample dynamic ele",async ({page})=>{
    await page.goto("https://www.w3schools.com/html/html_tables.asp")
    const locateGermany=page.locator("//td[text()='Germany']/self::td")
    await expect(locateGermany).toHaveText("Germany")
    await page.waitForTimeout(2000)

    const entirerow=page.locator("//td[text()='Germany']/parent::tr");//using germany i want to select parent selcts entire Row
    await expect(entirerow).toContainText("Maria Anders Germany");
    console.log(await entirerow.textContent());

    const byparentfindchild:Locator=page.locator("//table[@id='customers']//tr[3]/child::td");
    console.log(await byparentfindchild.allTextContents())
    await  expect(byparentfindchild).toHaveCount(3);


    const alltableElementFromGermany=page.locator("//td[text()='Germany']/ancestor::table");
    await expect(alltableElementFromGermany).toHaveAttribute('id','customers')
    console.log(await alltableElementFromGermany.allTextContents())

    //finding the following of the Germany
    // const follo=page.locator("//td[text()='Germany']//following::td[1]");
    // console.log(await follo.allTextContents());
    // await expect(follo).toHaveCount(1)
    // await expect(follo).toHaveText("Centro comercial Moctezuma");


   //finding the following of the Germany
    const follo=page.locator("//td[text()='Germany']//following::td");
    console.log(await follo.allTextContents());
    await expect(follo).not.toHaveCount(1)
    //await expect(follo).toHaveText("Centro comercial Moctezuma");
 
})


