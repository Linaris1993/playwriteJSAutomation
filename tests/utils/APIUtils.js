class APIUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {
        const loginResponce = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: this.loginPayLoad
    })
    const loginResponceJson = await loginResponce.json();
    const token = loginResponceJson.token();
    return token;

    }

    async createOrder(orderPayLoad) {
        const responce = {};
       responce.token = await this.getToken();
        const orderResponce = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data : orderPayLoad, 
        headers: {
            'Authorization' : responce.token,
            'Content-Type' : 'application/json'
        },

    })

    const orderResponceJson = await orderResponce.json
   const orderId = orderResponceJson.orders[0];
    responce.orderId = orderId;
    return responce;
}
}

module.export = {APIUtils};
