const { test, expect, request } = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayLoad = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
const orderPayLoad = {country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0"};

let responce;
test.beforeAll( async () => {
    const apiContext = await request.newContext();
   const apiUtils = new APIUtils(apiContext, loginPayLoad);
   responce = await apiUtils.createOrder(orderPayLoad);
    //
   
});

test('Place the order', async ({page}) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, responce.token );
   
    await page.goto("https://rahulshettyacademy.com/client");
     await page.locator("button[routerlink*='myorder']").click();
     await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr")

    for (let i = 0; i < await rows.count(); i++) {
       const rawOrderId = await rows.nth(i).locator("th").textContent();
       if (responce.orderId.includes(rawOrderId)) {
        await rows.nth(i).locator("button").first().click();
        break;
       }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(responce.orderId.includes(orderIdDetails)).toBeTruthy();
      // await page.pause();
});