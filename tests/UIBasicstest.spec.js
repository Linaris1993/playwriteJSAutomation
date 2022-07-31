const { test, expect } = require('@playwright/test');

test('Browser Context PLaywrite test', async ({browser}) => {

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
await expect(page.locator("[style*='block']")).toContainText('Incorrect');

//type - fill
await userName.fill(""); //clear the field
await userName.fill("rahulshettyacademy")
await signIn.click();
condole.log(await cardTitles.first().textContent()); //first or last one only
condole.log(await cardTitles.nth(1).textContent()); //second
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);
});

test('UI Controls', async ({page}) => {
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']")
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last();
    await page.locator("okayBtn").click();
  //  await page.pause();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck(); 
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); //assert el to be Unchecked
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test('Child Windows Handling', async ({browser}) => {
    const context = await browser.newContext(); //new session = window
    const page = await context.newPage(); //new page
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    const documentLink = page.locator("[href*='documents-request']");
    const userName = page.locator('#username');

    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),
    ])

   text = await newPage.locator(".red").textContent();
   const arrayText = text.split("@")
   const domain = arrayText[1].split(" ")[0];
   console.log(domain);
   await page.locator("#userName").type(domain);
   await page.pause();
 
});

