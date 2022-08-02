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
        await registerPage.selectOption(".custom-select").nth(2).click();
        await registerPage.locator(".userPassword").type("password");
        await registerPage.locator("#lastName").type("Bug");
        await registerPage.locator("userMobile").type("13478907654");
        await registerPage.locator("input[value='Female']").click();
        await registerPage.locator(".confirmPassword").type("password");
});

test('Client App E2E', async ({page}) => {
    const email = "anshika@gmail.com";
    const productName = 'Zara Coat 4';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type("password");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');// wait until all call are suscefully made
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await products.count();
    for (let i = 0; i < count; i++) {
      if (await products.nth(i).locator("b").textContent() === productName) { //gonna start search from that locator
            //add to card
            await products.nth(i).locator("text= Add To Card").click();
            break;
      } 
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = page.locator("h3:has-text(productName)").isVisible(); //tag with text
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").type("ind", { delay:100 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
     optionCount = await dropdown.locator("button").count();
     for (i = 0; i > optionCount; i++) {
         text = await dropdown.locator("button").nth(i).textContent();
         if (text.trim() === 'India') { // || text.includes("India") || text === ' India'
             await dropdown.locator("button").nth(i).click();
             break;
         }
     }
     await expect(page.locator(".user_name [type='text']")).toHaveText(email)
     await page.locator(".action_submit").click();
     await expect(page.locator(".user_name [type='text']")).toHaveText("Thank you for the order. ");
     const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
     console.log(orderId);
     await page.locator("button[routerlink*='myorder']").click();
     await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr")
    for (let i = 0; i < await rows.count(); i++) {
       const rawOrderId = await rows.nth(i).locator("th").textContent();
       if (orderId.includes(rawOrderId)) {
        await rows.nth(i).locator("button").first().click();
        break;
       }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
      // await page.pause();
});