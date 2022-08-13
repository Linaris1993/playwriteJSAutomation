const { test, expect, request } = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayLoad = {userEmail: "rahulshetty@gmail.com", userPassword: "Iamking@000"};
const orderPayLoad = {country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0"};
const fakePayLoadOrders = {data: [], message: "No Orders"};

let responce;

test.beforeAll( async () => {
   const apiContext = await request.newContext();
   const apiUtils = new APIUtils(apiContext, loginPayLoad);
   responce = await apiUtils.createOrder(orderPayLoad);
});

test('Place the order', async ({page}) => {

    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, responce.token );
   
     await page.goto("https://rahulshettyacademy.com/client");
     await page.locator("button[routerlink*='myorder']").click();
     await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=62f07623e26b7e1a10f54fbe",
    route => route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca'})
    )
     await page.locator("button:has-text('View)").first().click();
     await page.pause();
});
