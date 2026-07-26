import {test,expect} from 'playwright/test'

test.describe.configure({mode:'parallel'});

test("e2e  flow test1 @sanity",async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await expect(page).toHaveTitle("Automation Testing Practice");
    const inputname=await page.locator("#name");
   
    const valuefill=await inputname.fill("RAM");
    const value=await inputname.inputValue();
    console.log(value);
    //await expect(value).toHaveLength(15)
    const inputemail=page.getByPlaceholder("Enter EMail");
    inputemail.fill("qwerty@gmamil.com");
    const phoneno=page.getByPlaceholder("Enter Phone")
    await phoneno.fill("1234567");
    await page.waitForTimeout(1000)
    const addres=page.locator("#textarea")
    await addres.fill("sdfghjkcdertgyhujkdctg");
    const malecheckbox=page.locator("#male");
    await malecheckbox.check();
    const Days:string[]=["Sunday","Monday","Tuesday","Wednesday"];
    for(let day of Days){
     let DayLocators=page.getByLabel(day)
     await DayLocators.check();
}
await page.waitForTimeout(3000);
const countrydrop=page.locator("#country");
//await countrydrop.click();
// await countrydrop.selectOption({label: 'Canada'})
await countrydrop.selectOption({index: 5})
await page.waitForTimeout(1000);
const countryoptions=page.locator("#country").allInnerTexts();
console.log(await countryoptions);
const colorinput=page.getByLabel("Colors")
// await colorinput.selectOption([ 'red','green']);
await colorinput.selectOption([ 'red','green']);
await page.waitForTimeout(1000);
const allcolors=page.getByLabel("Colors").allInnerTexts();
console.log(await allcolors);

const colours=["Red","Blue"]; 
const animallistcontent=page.locator("#animals").allTextContents();
const sorteed=(await animallistcontent).sort();
await expect(await animallistcontent).toEqual(sorteed);


console.log(animallistcontent);
await page.waitForTimeout(1000);
// const animallocator=page.locator("animals");
// await page.pause()
// const datepickinputbox=page.locator("#datepicker");
// // await datepickinputbox.fill("04/11/2000");
// // await page.waitForTimeout(2000);

// //easiet way
// //--------------------------------------------

// //await datepickinputbox.getByText("18",{exact:true}).click();
// const moth="March";
// const year="2024";
// const date="20";
// await  page.click("#datepicker");
// while(true){
// const currentyear=await page.locator("ui-datepicker-year").textContent();
// const currentmonth=await page.locator(".ui-datepicker-month").textContent();
// console.log(currentyear);
// if(currentyear  ==year && currentmonth==moth){
//     break;

// }
// await page.locator("[title='Next']").click()
// }
// await page.waitForTimeout(3000);

//upload
const choose=page.locator("#singleFileInput");
await choose.setInputFiles("D:/Drivers/Downloads/ChatGPT Image Jul 18, 2026, 11_36_28 AM.png");
await page.getByRole('button', { name: 'Upload Single File' }).click();
await page.waitForTimeout(1000);


//-----multiple file====
const multi=page.locator("#multipleFilesInput");
await multi.setInputFiles(["D:/Drivers/Downloads/ChatGPT Image Jul 18, 2026, 11_36_28 AM.png",
    "d:/Drivers/Downloads/ChatGPT Image Jul 18, 2026, 11_36_28 AM.png"
])
await page.getByRole('button',{name:"Upload Multiple Files"}).click();
await page.waitForTimeout(2000);


const source=page.locator("//p[text()='Drag me to my target']")
const target=page.getByText("Drop here");
//  await source.dragTo(target);
//  await page.waitForTimeout(2000)

// using mpoouse hower
await source.hover();
await page.mouse.down()
await target.hover()
await page.mouse.up();


 


// while(true){
//     const currentyear=page.locator(".ui-datepicker-prev ui-corner-all").textContent();
// }

})



test("TC1: to do  app test2",async({page})=>{
    await page.goto("https://todomvc.com/");
    await expect(page.locator(".logo[alt='TodoMVC']")).toBeVisible();
    //await expect(page.getByLabel("React")).toBeVisible();
    await page.locator("//span[text()='React']").click();
});

//derag and derop
