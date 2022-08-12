const { test, expect } = require('@playwright/test');
const {customTest} = require('../utils/test-base');
const {POManager} = require ('../pageObjects/POManager');
//JSON -> string -> js object
//stringify -> convert JSON in string format
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeOrderTestData")));

for (const data of dataSet) {

// test('Register new user', async ({page}) => {
//     await page.goto("https://rahulshettyacademy.com/client");
//     const registerBtn = page.locator(".text-reset")
    
//     const [registerPage] = await Promise.all([
//         context.waitForEvent('page'),
//         registerBtn.click()
//         ])

//         await expect(registerPage.locator(".login-title")).toContainText("Register");
//         await registerPage.locator("#firstName").type("Lady");
//         await registerPage.locator("#userEmail").type("testing@email.com");
//         await registerPage.selectOption(".custom-select").nth(2).click();
//         await registerPage.locator(".userPassword").type("password");
//         await registerPage.locator("#lastName").type("Bug");
//         await registerPage.locator("userMobile").type("13478907654");
//         await registerPage.locator("input[value='Female']").click();
//         await registerPage.locator(".confirmPassword").type("password");
// });

test(`Client App E2E for ${data.productName}`, async ({page}) => {
    const poManager = new POManager(page);
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashBoardPage();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.userName, data.password);
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCard();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
   
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

customTest(`Client App E2E for `, async ({page, testDataForOrder}) => {
    const poManager = new POManager(page);
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashBoardPage();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.userName, data.password);
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCard();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();
});

}