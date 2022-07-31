// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
 
    timeout: 5000
  },
  
  reporter: 'html',

  use: {
    browserName: 'chromium',
    screenshot: 'on',
    trace: 'retain-on-failure', //gonna show trace.zip only for failed tests
    headless: false
  },

};

module.exports = config;
