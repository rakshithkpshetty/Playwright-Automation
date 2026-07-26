import {test,expect} from 'playwright/test';

test("e2e continuation",async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await expect(page).toHaveTitle("Automation Testing Practice");
    //count rows
    const rows=page.locator("table tr")
    const allroows=await rows.all()
    //console.log("all rows--->",allroows.length)
    for( const rowdata  of allroows.slice(1)){
        //console.log(await rowdata.allInnerTexts());
        const cols= await  rowdata.locator("td").allInnerTexts();
        //console.log(cols);
        const bookname=cols[0];
        const author=cols[1];

         //console.log(bookname);
         if(author=="Mukesh"){
         console.log(bookname);}
      
    }
    const locatechrome=page.locator("//td[text()='Chrome']/following::td[1]").innerText()

    console.log("------>",await locatechrome);

    await page.waitForTimeout(5000);

    const dynamiccrow=page.locator("table tbody tr");
    const dyncount=await dynamiccrow.count();
    console.log("+++++++++>count",dyncount)
    for(let i=0;i<dyncount;i++){
        const  cols=await dynamiccrow.nth(i).locator('td').allInnerTexts()
        if(cols[0]=="Chromium"){
            console.log(cols);
            break;

        }
    }

    const pagerows=await page.locator("#productTable tbody  tr");
    const countrowpages=await pagerows.count()
    for(let row=0;row<countrowpages;row++){
        const cols=await pagerows.nth(row).locator("td").allInnerTexts()
        const products=cols[1];
        console.log('///////////////>0',cols[1]);
        // console.log(cols);
        // if(products?.trim()==="Smartphone")
        // {
        //     await rows.nth(row).locator("td:nth-child(2)").check()
        // }
    }

page.on("dialog",async(dialog)=>{
    console.log(dialog.message());
    console.log(dialog.type());
    await dialog.accept();
    
})
    
    // const alertbutt=page.locator("#alertBtn")
    // await alertbutt.click();
    // await page.getByText("OK").click();
    // await page.waitForTimeout(2000);
    
    const button=page.getByRole('button',{name:'START'}).or(page.getByRole('button',{name:'STOP'}))
    for(let i=0;i<5;i++){
    await button.click()
    await page.waitForTimeout(2000)}




});