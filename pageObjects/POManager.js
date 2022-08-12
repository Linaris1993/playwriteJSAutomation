const {LoginPage}  = require('./LoginPage');
const {DashboardPage} = require('./DashBoardPage');
const {OrdersHistoryPage} = require('./OrdersHistoryPage');
const {OrdersReviewPage} = require('./OrdersReviewPage');
const {CartPage} = require('./CartPage');

class POManager {

    constractor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.cartPage = new CartPage(this.page);
    }


    getLoginPage() {
        return this.loginPage;
    }

    getDashBoardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }
    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }
}

module.exports = {POManager};