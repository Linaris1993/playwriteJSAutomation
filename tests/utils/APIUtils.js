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
        // 200, 201
    expect(loginResponce.ok()).toBeTtuthy();

    const loginResponceJson = await loginResponce.json();
    const token = loginResponceJson;
    console.log(token);
    return token;
    }

    async createOrder(orderPayLoad) {
        let responce = {};
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
    console.log(orderResponceJson);
    const orderId = orderResponceJson.orders[0];
    responce.orderId = orderId;
    return responce;
}
}

module.export = {APIUtils};
