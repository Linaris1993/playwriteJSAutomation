const {test, expect} = require('@playwright/test');
test.describe({mode:'parallel'});
//test.describe({mode:'serial'}); //for a case where test 2 dependent on test 1 result

test("@Web Popup validations", async ({page}) => { //@web tag; when running test - add to the commnd line  --grep @web
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

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

// await page.goto("https://google.com");
// await page.goBack(); //navigation 
// await page.goForward(); //navigation 

test("Screenshot and Visual comparision", async({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.screenshot({path: 'screenshot.png'}); //screenshot of all page
    await page.locator("hide-textbox").click();
    await page.locator("#displayed-text").screenshot({path: 'partialScreenshot.png'}); //screenshot of that el on page
    await expect(page.locator("#displayed-text")).toBeHidden();
});

//screeshot -store -> screenshot -> 
test('visual test', async({page}) => {

    await page.goto("https://flightaware.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
//on first run its gonna fail (will take first screenshot (landing.png)) and will compare screeshots next run

});