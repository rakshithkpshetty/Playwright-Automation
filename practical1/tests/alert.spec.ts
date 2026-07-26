import  {test,expect} from "@playwright/test"

test("Alerts",async({page})=>{
    page.goto("https://testautomationpractice.blogspot.com/")
    const simple=await page.locator("#alertBtn")
    page.on('dialog',(dialog)=>{//triggeerevent by default it able to do by itself
        console.log("Type of dialog",dialog.type())
        console.log("message",dialog.message())
        expect(dialog.message()).toBe("I am an alert box!")
        dialog.accept()
       // dialog.dismiss()
    })
    await page.waitForTimeout(3000)
    await simple.click();
    await page.waitForTimeout(5000)//autoMmaticaklly closed by playwright
})
    test("confirmAlerts",async({page})=>{
    page.goto("https://testautomationpractice.blogspot.com/")
    const cnfrm=await page.locator("#confirmBtn")
    page.on('dialog',(dialog)=>{//triggeerevent by default it able to do by itself
        console.log("Type of dialog",dialog.type())
        console.log("message",dialog.message())
        expect(dialog.message()).toBe("Press a button!")
        //dialog.accept()
       dialog.dismiss()
    })
    await page.waitForTimeout(3000)
    await cnfrm.click();
    const text=page.locator('#demo').innerText()
    console.log("Output  text",await text)
    

    
    await page.waitForTimeout(5000)//autoMmaticaklly closed by playwright
    //const messsgeafterclick=page.locator("#demo")
    await expect(await text).toBe("You pressed Cancel!");
    })
    
    
    test("Prompt",async({page})=>{
    page.goto("https://testautomationpractice.blogspot.com/")
    const prompt=await page.locator("#promptBtn")
    page.on('dialog',(dialog)=>{//triggeerevent by default it able to do by itself
        console.log("Type of dialog",dialog.type())
        console.log("message",dialog.message())
        expect(dialog.message()).toBe("Please enter your name:")
        //dialog.accept()
        expect(dialog.defaultValue()).toContain("Harry Potter")
        dialog.accept('John')
        
       dialog.dismiss()
    })
    await page.waitForTimeout(3000)
    await prompt.click()
    
    const text=page.locator('#demo').innerText()
    console.log("Output  text",await text)
    

    
    await page.waitForTimeout(5000)//autoMmaticaklly closed by playwright
    //const messsgeafterclick=page.locator("#demo")
    await expect(await text).toBe("Hello John! How are you today?");
    })


     test.only("frames",async({page})=>{
        await page.goto("https://ui.vision/demo/webtest/frames/")
        const frames=page.frames()
        console.log("total-----------",frames.length)


        const frame=page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1"})
        //console.log(frame.)
        if(frame){
            await frame.locator("[name:'mytxt1']").fill("Hello");
            //frame.fill("[name='mytest1']","JOhn");
            //radio
            //frame.check
        }
        else{
            console.log("frame is not available")
        }
        await page.waitForTimeout(3000);
     });