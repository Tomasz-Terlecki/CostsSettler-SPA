const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/results/testResult-[hash].xml',
    overwrite: false
  },
  e2e: {
    setupNodeEvents(on: any, config: any) {
    },
    baseUrl: "http://costssettler.com/",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 20000,
    viewportHeight: 1080,
    viewportWidth: 1920,
    testIsolation: false,
    numTestsKeptInMemory: 0,
    video: false,
    screenshotOnRunFailure: true
  }
});
