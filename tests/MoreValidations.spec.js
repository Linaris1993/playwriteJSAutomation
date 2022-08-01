const {test, expect} = require('@playwright/test');

test("Popup validations", async ({page}) => {

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
// await page.goto("https://google.com");
// await page.goBack(); //navigation 
// await page.goForward(); //navigation 
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();
await page.pause();
page.on('dialog', dialog => dialog.accept()); //pop up => (dismiss is to cancell, accept = ok)
await page.locator("#confirmbtn").click();

await page.locator('#mousehover').hover(); //mouse hover 

const framesPage = page.frameLocator("courses-iframe"); //switch to frame 
await framesPage.locator("li a[href*='lifetime-access]:visible").click(); //gonna show only visible el 
const textCheck = await framesPage.locator(".text h2").textContent();
textCheck.split(" ")[1]; //gonna show 2nd word
});