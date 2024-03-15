const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: 3,
  viewportHeight: 1080,
  viewportWidth: 1920,
  watchForFileChanges: false,
  e2e: {
    baseUrl: 'https://juice-shop-sanitarskyi.herokuapp.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
