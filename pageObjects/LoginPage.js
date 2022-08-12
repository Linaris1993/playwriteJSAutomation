class LoginPage {

    constructor(page) {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.userPassword = page.locator("#userPassword");
        this.signInButton = page.locator("[value='Login']");
    }

    async goTo() {
        await page.goTo("https://rahulshettyacademy.com/client");
    }

    async validLogin(userName, password) {
        await this.userName.type(userName);
        await this.password.type(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle'); // wait until all call are suscefully made
    }
}

module.exports = {LoginPage};