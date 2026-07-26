import {expect,Locator,test} from "playwright/test";

test("sample checkup",async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator("#name").fill("Ram");
    await page.getByPlaceholder("Enter EMail").fill("dhdbuhsb@gmail.com")
    await  page.locator("#phone").fill("44884848")
    await page.getByLabel("Male")
    const getcheckBoxSunday:Locator=page.getByLabel("Sunday");
    await getcheckBoxSunday.uncheck();
    await expect(getcheckBoxSunday).not.toBeChecked();
    
    const days:string[]=['Sunday','Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday'] //to check the checkboxes
    const checkboxes:Locator[]=days.map(index=>page.getByLabel(index))
    await expect(checkboxes).toHaveLength(7);
    for(const checkelement of  checkboxes){
       await  checkelement.check(); 
       await expect(checkelement).toBeChecked();

    }
    await page.waitForTimeout(3000);
//--------------------------------------------------------------------------
    for(const checkelement of  checkboxes.slice(-3)){
       await  checkelement.uncheck(); 
       await expect(checkelement).not.toBeChecked();
    }
    await page.waitForTimeout(3000);
//-----------------------------------------------------------------------
   //if check  make uncheck or else uncheck then its checked
   for(const checkbox of checkboxes ){
    if(await checkbox.isChecked){
    await checkbox.uncheck  ()
    await expect(checkbox).not.toBeChecked();
    }
    
    else{
        //await page.waitForTimeout(3000);
     //await page.waitForTimeout(3000);
    await checkbox.check()
    await expect(checkbox).toBeChecked();
   }
}
 await page.waitForTimeout(3000);
//Ranndom
const indexes:number[]=[1,3,4]
for(const i of indexes){
    await checkboxes[i].check();
    await expect(checkboxes[i]).toBeChecked();

}

//selecct the checkbox based on the label
await page.waitForTimeout(2000);

const weekday="Tuesday";
for(const day of days){
    if(weekday.toLocaleLowerCase()==day.toLowerCase()){
        const checkbox=await page.getByLabel(weekday)
        checkbox.check()
        await expect(checkbox).toBeChecked();
        
    }
}


    await page.waitForTimeout(3000);

    

})