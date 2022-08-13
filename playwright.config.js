 const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries: 2,
  workers: 1, //means only 1 test file will run at a time (if 3 = 3 test will run in parallel)
  timeout: 30 * 1000, ///* Maximum time one test can run for. */
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  projects: [
    {
      name: 'chrome execution',
      use: {
        browserName: 'chromium', //webkit - safari
        screenshot: 'on',
        trace: 'retain-on-fai lure', //gonna show trace.zip only for failed tests,
        ingnoreHttpErrors: true, //will ignore error for webstites, which are not ssl sertificated
        permissions:['geolocation'], //give permission to show your location
        headless: false,
        viewport : { width:720, height:720 }
      }
    },
      {
        name: 'safari execution',
        use: {
        browserName: 'chromium', //webkit - safari
        screenshot: 'on',
        video: 'retain-on-failure', //gonna record video for failed tests
        trace: 'retain-on-fai lure', //gonna show trace.zip only for failed tests
        headless: false,
       ...devices['iPhone 11']
        }
      },
  ],
};

module.exports = config;
