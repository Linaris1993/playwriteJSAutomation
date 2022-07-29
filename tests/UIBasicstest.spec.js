const { test, expect } = require('@playwright/test');

test.only('Browser Context PLaywrite test', async ({browser}) => {
const context = await browser.newContext();
const page = await context.newPage();
const userName = page.locator('#username');
const signIn = page.locator("#signInBtn");
const cardTitles = page.locator(".card-body a")

await page.goto("https://rahulshettyacademy.com/loginpagePractise");
console.log(await page.title());
await userName.type("rahulshetty");
await page.locator("[type='password]").type("learning");

//race condition
await Promise.all(
    [
page.waitForNavigation(),
signIn.click(),
    ]
);

console.log(await page.locator("[style*='block']").textContent());
await expect().toContainText('Incorrect');

//type - fill
await userName.fill(""); //clear the field
await userName.fill("rahulshettyacademy")
await userName.click();
condole.log(await cardTitles.first().textContent()); //first or last one only
condole.log(await cardTitles.nth(1).textContent()); //second
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);
});

test('Page PLaywrite test', async ({page}) => {
 
    await page.goto("http://google.com");
    await page.title();
    await expect(page).toHaveTitle("Google")
});