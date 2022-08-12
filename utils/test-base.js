const { base } = require('@playwright/test');

exports.customTest = base.test.extend(
    {
        testDataForOrder :  {
            userName : "anshika@gmail.com",
            password : "Iamking@000",
            productName : "Zara Coat 4"
        }
    }
)