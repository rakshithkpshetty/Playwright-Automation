import { test, expect } from '@playwright/test';

test("Demo test", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");

  // Fix the XPath
  const products = page.locator("//a[contains(@href,'computer')]");



  // Count how many product links are found
  const couunt = await products.count();
  console.log("------->", couunt);

  // Click the first product link if it exists
  if (couunt > 0) {
    await products.first().click();
    await expect(page).toHaveURL(/computer/);
  }
  console.log("frst",await products.first().textContent())

  let producttitle:string[]=await products.allTextContents()
  console.log(producttitle);
  for(let pt of  producttitle){
    console.log(pt)
  }

  const buildlocattext = page.locator("//h2/a[starts-with(@href,'/build')]");

  // Count elements
  const count: number = await buildlocattext.count();
  console.log("Found build links:", count);

  await page.locator("//a[text()='Register']").click()
  await page.waitForTimeout(3000)

  // Assert that at least one exists
  //expect(count).toBeGreaterThan(0);

  // Optionally click the first one
  //await buildlocattext.first().click();
  const google=page.locator("//div[@class='column follow-us']//li[position()=4]")
  await expect(google).toBeVisible()
  console.log(google.textContent());


  ///dytnamic element stop click start and start then stop





});