const { test, expect } = require('@playwright/test');

test('Browser Context PLaywrite test', async ({browser}) => {
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test('Page PLaywrite test', async ({page}) => {
 
    await page.goto("http://google.com");
   await page.title();
    await expect(page).toHaveTitle("Google")
    });