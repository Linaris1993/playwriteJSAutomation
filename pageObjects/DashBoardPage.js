class DashboardPage {


constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productName = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");

    }

    async searchProductAddCart(productName) {
        const titles = await this.productText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
          if (await this.products.nth(i).locator("b").textContent() === this.productName) { //gonna start search from that locator
                //add to card
                await this.products.nth(i).locator("text= Add To Card").click();
                break;
          } 
        }
    }

    async navigateToCard() {
        await this.cart.click();
    }

    async navigateToOrders()
    {
    await this.orders.click();
    }
}
module.exports = {DashboardPage};