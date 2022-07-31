const { test, expect } = require('@playwright/test');

test('Register new user', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client");
    const registerBtn = page.locator(".text-reset")
    
    const [registerPage] = await Promise.all([
        context.waitForEvent('page'),
        registerBtn.click()
        ])

        await expect(registerPage.locator(".login-title")).toContainText("Register");
        await registerPage.locator("#firstName").type("Lady");
        await registerPage.locator("#userEmail").type("testing@email.com");
        await registerPage.locator(".custom-select").nth(2).click();
        await registerPage.locator(".userPassword").type("password");
        await registerPage.locator("#lastName").type("Bug");
        await registerPage.locator("userMobile").type("13478907654");
        await registerBtn.locator("input[value='Female']").click();
        await registerPage.locator(".confirmPassword").type("password");
});

test('Browser Context PLaywrite test', async ({page}) => {
await page.goto("https://rahulshettyacademy.com/client");
await page.locator("#userEmail").fill("@anshika@gmail.com");
await page.locator("#userPassword").type("IamKing@000");
await page.locator("[value='Login']").click();
await page.waitForLoadState('networkidle');// wait until all call are suscefully made
const titles = await page.locator(".card-body b").allTextContents();
console.log(titles);
});