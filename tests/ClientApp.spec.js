const { test, expect } = require('@playwright/test');

test.only('Browser Context PLaywrite test', async ({page}) => {
await page.goto("https://rahulshettyacademy.com/client");
await page.locator("#userEmail").fill("@anshika@gmail.com");
await page.locator("#userPassword").type("IamKing@000");
await page.locator("[value='Login']").click();
await page.waitForLoadState('networkidle');// wait until all call are suscefully made
const titles = await page.locator(".card-body b").allTextContents();
console.log(titles);

});